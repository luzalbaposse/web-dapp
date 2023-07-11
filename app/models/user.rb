class User < ApplicationRecord
  has_paper_trail ignore: [:updated_at]

  include Clearance::User

  validate :role_is_valid, if: -> { role.present? }
  validate :email_and_credentials
  validate :validate_notification_preferences
  validate :username_is_valid
  validates :username, :email, uniqueness: true
  validates :humanity_proof, uniqueness: true, if: -> { humanity_proof.present? }
  validates :wallet_id, uniqueness: true, if: -> { wallet_id.present? }
  validates_numericality_of :profile_completeness, less_than_or_equal_to: 1

  belongs_to :invited, class_name: "Invite", foreign_key: "invite_id", optional: true
  belongs_to :race, optional: true

  has_many :invites
  has_many :user_tags
  has_many :tags, through: :user_tags

  has_one :discovery_row
  has_one :talent
  has_one :user_email_log, dependent: :destroy

  # Chat
  has_many :messagee, foreign_key: :receiver_id, class_name: "Message"
  has_many :senders, through: :messagee
  has_many :messaged, foreign_key: :sender_id, class_name: "Message"
  has_many :receivers, through: :messaged

  # Feed
  has_many :subscriptions, dependent: :destroy
  has_many :active_subscriptions, class_name: "ActiveSubscription"
  has_many :pending_subscriptions, class_name: "PendingSubscription"

  has_many :subscribers, through: :active_subscriptions # only use to load users, never to count
  has_many :subscribing, foreign_key: :subscriber_id, class_name: "Subscription"
  has_many :active_subscribing, foreign_key: :subscriber_id, class_name: "ActiveSubscription"
  has_many :pending_subscribing, foreign_key: :subscriber_id, class_name: "PendingSubscription"
  has_many :users_subscribing, foreign_key: :user_id, source: "user", through: :active_subscribing

  has_many :notifications, as: :recipient
  has_many :quests
  has_many :connections, dependent: :destroy
  has_many :career_updates

  # Rewards
  has_many :rewards

  # web3
  has_many :user_domains, dependent: :destroy
  has_many :erc20_tokens, dependent: :destroy
  has_many :erc721_tokens, dependent: :destroy

  # Activities
  has_many :origin_activities, class_name: "Activity", foreign_key: "origin_user_id", dependent: :destroy
  has_many :target_activities, class_name: "Activity", foreign_key: "target_user_id", dependent: :destroy
  has_one :activity_feed, dependent: :destroy

  # teams - there are functions go get teams and/or communities
  has_many :memberships
  has_many :organizations, through: :memberships

  # Elasticsearch index update
  update_index("talents", :talent)

  after_save :touch_talent

  VALID_ROLES = ["admin", "basic", "moderator"].freeze
  REQUIRED_PROFILE_FIELDS = [
    {
      name: "display_name",
      description: "Add your display name"
    },
    {
      name: "profile_picture",
      description: "Add your profile picture"
    },
    {
      name: "occupation",
      description: "Add your current occupation"
    },
    {
      name: "headline",
      description: "Add your headline"
    },
    {
      name: "career_goal",
      description: "Add at least one career goal"
    },
    {
      name: "milestone",
      description: "Add at least one item to your journey"
    },
    {
      name: "tag",
      description: "Add at least one tag"
    },
    {
      name: "social_link",
      description: "Add at least 1 social link"
    },
    {
      name: "verified",
      description: "Verify your identity"
    }
  ].freeze

  enum profile_type: {
    supporter: "supporter",
    applying: "applying",
    waiting_for_approval: "waiting_for_approval",
    approved: "approved",
    talent: "talent",
    rejected: "rejected"
  }

  module Delivery
    TYPES = [
      MessageReceivedNotification,
      TokenAcquiredNotification
    ].map(&:name).freeze

    METHODS = [DISABLED = 0, IMMEDIATE = 1, DIGEST = 2]
  end

  scope :onboarded, -> { where.not(onboarded_at: nil) }
  scope :profile_completed, -> { where.not(profile_completed_at: nil) }

  # [CLEARANCE] override email writing to allow nil but not two emails ""
  def self.normalize_email(email)
    if email.nil?
      email
    else
      email.to_s.downcase.gsub(/\s+/, "")
    end
  end
  # [CLEARANCE] end

  # usernames were restricted to 50 characters to avoid UI issues
  # checkout the notion page: https://www.notion.so/talentprotocol/Onboarding-Improvements-f79a65c37309419b9de8e05d794bc170?pvs=4
  def self.valid_username?(new_username)
    new_username && new_username.length > 0 && new_username.length <= 50 && new_username.match?(/^[a-z0-9]*$/)
  end

  def self.valid_email?(new_email)
    return false unless new_email && new_email.length > 0

    if ENV["EMAIL_REGEX_WITHOUT_ALIASES"] == "true"
      new_email.match?(/^(([^<>()\[\]\\.,;:\s@+"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    else
      new_email.match?(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    end
  end

  def active_supporter?
    TalentSupporter.where(supporter_wallet_id: wallet_id).present?
  end

  def active_theme
    if theme_preference == "light"
      "light-body"
    else
      "dark-body"
    end
  end

  def admin?
    role == "admin"
  end

  def moderator?
    role == "moderator"
  end

  def admin_or_moderator?
    role.in?(%w[admin moderator])
  end

  def as_json(options = {})
    options[:except] ||= [:remember_token, :encrypted_password, :confirmation_token, :last_sign_in_at, :nounce, :email_confirmation_token]
    super(options)
  end

  def confirm_email
    self.email_confirmed_at = Time.current
    save
  end

  def display_wallet_id
    return user_domain.domain if user_domain.present?

    wallet_id ? "#{wallet_id[0..10]}..." : ""
  end

  def visible_digital_collectibles?
    erc20_tokens.visible.any? || erc721_tokens.visible.any?
  end

  def has_unread_messages?
    messagee.unread.any?
  end

  def last_message_with(chat_user)
    result = Message.where(sender_id: id, receiver_id: chat_user.id)
      .or(Message.where(sender_id: chat_user.id, receiver_id: id)).order(id: :desc).limit(1)

    if result.length > 0
      result[0]
    end
  end

  def name
    display_name.present? ? display_name : username
  end

  def onboarding_complete?
    onboarded_at.present?
  end

  def pending_subscribers
    User.where(id: pending_subscriptions.pluck(:subscriber_id))
  end

  def pending_network_requests?
    pending_subscriptions.any? || sponsors.pending.any?
  end

  def portfolio(including_self: true, invested_after: nil)
    return User.none unless wallet_id

    talent_supporters = TalentSupporter.where(supporter_wallet_id: wallet_id)
    talent_supporters = talent_supporters.where("last_time_bought_at > ?", invested_after) if invested_after

    token_contract_ids = talent_supporters.pluck(:talent_contract_id)
    supporting_users = User.joins(talent: :talent_token).where(talent_tokens: {contract_id: token_contract_ids})

    including_self ? supporting_users : supporting_users.where.not(id: id)
  end

  def tal_amount_invested
    return 0 unless wallet_id

    talent_supporters = TalentSupporter.where(supporter_wallet_id: wallet_id)
    talent_supporters.sum { |tp| tp.tal_amount.to_i }
  end

  def usd_amount_invested
    (tal_amount_invested * TalentToken::TAL_VALUE_IN_USD) / TalentToken::TAL_DECIMALS
  end

  def prefers_digest_notification?(type)
    notification_preferences[type.name] == Delivery::DIGEST
  end

  def prefers_immediate_notification?(type)
    notification_preferences[type.name].nil? ||
      notification_preferences[type.name] == Delivery::IMMEDIATE
  end

  def profile_completed?
    missing_profile_fields.empty?
  end

  def profile_complete_quest_completed?
    fields = []
    fields << "display_name" unless display_name
    fields << "profile_picture" unless profile_picture_url
    fields << "occupation" unless talent.occupation
    fields << "headline" unless talent.headline
    fields << "career_goal" unless talent.career_goal&.goals&.any?
    fields << "milestone" unless talent.milestones.any?

    fields.empty?
  end

  def missing_profile_fields
    fields = []
    fields << "display_name" unless display_name
    fields << "profile_picture" unless profile_picture_url
    fields << "occupation" unless talent.occupation
    fields << "headline" unless talent.headline
    fields << "career_goal" unless talent.career_goal&.goals&.any?
    fields << "milestone" unless talent.milestones.any?
    fields << "tag" unless tags.visible.any?
    fields << "social_link" unless talent.social_links.any?
    fields << "verified" unless talent.verified?
    fields
  end

  def upsert_profile_completeness!
    required_fields_count = REQUIRED_PROFILE_FIELDS.count + 1
    completed_fields_count = (required_fields_count - missing_profile_fields.count)

    update!(profile_completeness: completed_fields_count.to_f / required_fields_count)
  end

  def profile_picture_url
    talent&.profile_picture_url
  end

  def public_displayable?
    profile_type == "talent" || profile_type == "approved"
  end

  def receiver_chat_id(chat_user)
    [id, chat_user.id].join("")
  end

  def sender_chat_id(chat_user)
    [id, chat_user.id].join("")
  end

  # user acted as talent (sponsor receiver)
  def sponsors
    return Sponsorship.none unless wallet_id

    Sponsorship.where(talent: wallet_id)
  end

  def claimed_sponsors
    return Sponsorship.none unless wallet_id

    sponsors.where.not(claimed_at: nil)
  end

  # user acted as sponsor
  def sponsorships
    return Sponsorship.none unless wallet_id

    Sponsorship.where(sponsor: wallet_id)
  end

  def supporters(including_self: true, invested_after: nil)
    return User.none unless talent&.talent_token&.deployed?

    talent_supporters = TalentSupporter.where(talent_contract_id: talent.talent_token.contract_id)
    talent_supporters = talent_supporters.where("last_time_bought_at > ?", invested_after) if invested_after

    supporters_wallet_ids = talent_supporters.pluck(:supporter_wallet_id)
    supporters = User.where(wallet_id: supporters_wallet_ids)

    including_self ? supporters : supporters.where.not(id: id)
  end

  def subscriber_of?(user)
    active_subscribing.find_by(user: user).present?
  end

  def amount_invested_in(user)
    return 0 unless user.talent&.talent_token&.deployed?

    TalentSupporter.where(supporter_wallet_id: wallet_id, talent_contract_id: user.talent.talent_token.contract_id).sum { |ts| ts.amount.to_i }
  end

  def connected_with_since(other_user)
    sponsor_data = sponsors.claimed.where(sponsor: other_user.wallet_id).order(:claimed_at).first
    sponsoring_data = sponsorships.claimed.where(talent: other_user.wallet_id).order(:claimed_at).first
    supporter_data = TalentSupporter.find_by(supporter_wallet_id: wallet_id, talent_contract_id: other_user.talent&.talent_token&.contract_id)
    supporting_data = TalentSupporter.find_by(supporter_wallet_id: other_user.wallet_id, talent_contract_id: talent&.talent_token&.contract_id)
    subscriber_data = subscriptions.find_by(subscriber: other_user)
    subscribing_data = subscribing.find_by(user: other_user)

    [
      sponsor_data&.claimed_at,
      sponsoring_data&.claimed_at,
      supporter_data&.first_time_bought_at,
      supporting_data&.first_time_bought_at,
      subscriber_data&.created_at,
      subscribing_data&.created_at
    ].compact.min
  end

  def talent?
    talent.present?
  end

  def user_domain
    tal_domain || user_domains.first
  end

  def tal_domain
    user_domains.find_by(tal_domain: true)
  end

  def valid_delete_account_token?(token)
    return false unless delete_account_token && delete_account_token_expires_at

    delete_account_token == token && delete_account_token_expires_at > Time.current
  end

  def approved_by
    return unless profile_type == "approved" || profile_type == "talent"

    profile_type_change = UserProfileTypeChange.find_by(new_profile_type: "approved", user: self)
    return unless profile_type_change

    profile_type_change.who_dunnit
  end

  def aggregate_supporters_count
    Connection.where(
      user_id: id,
      connection_type: ["sponsored", "staker", "subscriber", "mutual_stake", "mutual_subscription"]
    ).count
  end

  def aggregate_supporting_count
    Connection.where(
      user_id: id,
      connection_type: ["sponsor", "staking", "mutual_stake", "mutual_subscription", "subscribing"]
    ).count
  end

  private

  def email_and_password
    return if email.present? && encrypted_password.present?

    errors.add(:base, "The user doesn't respect the required login requirements")
  end

  def email_optional?
    true
  end

  def password_optional?
    true
  end

  def role_is_valid
    unless role.in?(VALID_ROLES)
      errors.add(:base, "The role #{role} isn't supported.")
    end
  end

  def username_is_valid
    errors.add(:base, "The username has invalid characters.") unless username.match?(/^[a-z0-9]*$/)
  end

  def email_and_credentials
    return if email.present? && (encrypted_password.present? || linkedin_id.present?)

    errors.add(:base, "The user doesn't respect the required login requirements")
  end

  def validate_notification_preferences
    valid = false

    if notification_preferences.is_a?(Hash)
      valid = notification_preferences.all? do |type, value|
        Delivery::TYPES.include?(type) && Delivery::METHODS.include?(value)
      end
    end

    if !valid
      errors.add(:notification_preferences, "Invalid notification preferences.")
    end
  end

  def touch_talent
    talent.touch if talent.present?
  end

  def teams
    organizations.where(type: "Organizations::Team")
  end

  def communities
    organizations.where(type: "Organizations::Community")
  end
end
