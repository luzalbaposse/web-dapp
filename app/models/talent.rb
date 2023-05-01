class Talent < ApplicationRecord
  has_paper_trail

  include ::ProfilePictureUploader::Attachment(:profile_picture)
  include ::BannerUploader::Attachment(:banner)

  store :profile, accessors: %i[
    based_in
    discord
    email
    ethnicity
    gender
    github
    headline
    linkedin
    location
    occupation
    nationality
    pronouns
    telegram
    mastodon
    lens
    twitter
    video
    wallet_address
    website
    highlighted_headline_words_index
  ], coder: JSON

  validate :public_key_is_valid

  belongs_to :user, optional: true

  has_one :talent_token
  has_one :career_goal
  has_many :perks
  has_many :milestones

  scope :base, -> { where(public: true, hide_profile: false) }
  scope :active, -> { joins(:talent_token).where.not(talent_tokens: {contract_id: nil}) }
  scope :upcoming, -> { joins(:talent_token).where(talent_tokens: {contract_id: nil}) }
  scope :profile_complete, -> { joins(user: :quests).where(quests: {type: "Quests::TalentProfile", status: "done"}) }

  delegate :wallet_id, :username, to: :user

  update_index("talents", :self)

  def self.base_supply
    2000000000000000000000
  end

  def self.max_supply
    1000000000000000000000000
  end

  def display_wallet_id
    "#{wallet_id[0..10]}..."
  end

  def status
    if talent_token.contract_id.nil?
      "Upcoming"
    else
      "Active"
    end
  end

  def active?
    status == "Active"
  end

  def to_param
    return nil unless persisted?
    user&.username || id
  end

  def banner_url
    banner(:default)&.url || super
  end

  def profile_picture_url
    profile_picture(:default)&.url || super
  end

  private

  def public_key_is_valid
    if public_key.present? && Integer(public_key).is_a?(Integer)
      errors.add(:base, "The public key can't be a number")
    end
  rescue ArgumentError
  end
end
