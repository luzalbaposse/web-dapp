class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :connected_user, foreign_key: :connected_user_id, class_name: "User"

  validates :connected_at, presence: true
  validates :user_id, uniqueness: {scope: :connected_user_id}

  # Try reading it like this:
  # user is sponsor of connected_user
  # user is sponsored by the connected_user
  # user is a mutual sponsor of connected_user
  # user is a staker of connected_user
  # user is staking in the connected_user
  # user is subscribing and is a being subscribed by the connected_user
  # user is a subscriber of connected_user
  # user is subscribing the connected_user
  SPONSOR = "sponsor".freeze
  SPONSORING = "sponsoring".freeze
  STAKER = "staker".freeze
  STAKING = "staking".freeze
  SUBSCRIBER = "subscriber".freeze
  SUBSCRIBING = "subscribing".freeze

  enum connection_type: {
    sponsor: 8,
    sponsored: 7,
    mutual_stake: 6,
    staker: 5,
    staking: 4,
    mutual_subscription: 3,
    subscriber: 2,
    subscribing: 1
  }

  def refresh_connection!
    return false if user.id == connected_user.id

    connected_at = user.connected_with_since(connected_user)
    user_invested_amount = user.amount_invested_in(connected_user)
    connected_user_invested_amount = connected_user.amount_invested_in(user)
    connection_type = calculate_connection_type(user_invested_amount, connected_user_invested_amount)
    connection_types = calculate_connection_types(user_invested_amount, connected_user_invested_amount)

    return destroy! unless connection_type

    update!(
      user_invested_amount: user_invested_amount,
      connected_user_invested_amount: connected_user_invested_amount,
      connection_type: connection_type,
      connection_types: connection_types,
      connected_at: connected_at
    )

    self
  end

  private

  def calculate_connection_type(user_invested_amount, connected_user_invested_amount)
    return 8 if users_with_wallets_connected? && user_sponsoring_connected_user?
    return 7 if users_with_wallets_connected? && connected_user_sponsoring_user?
    return 6 if user_invested_amount.to_i.positive? && connected_user_invested_amount.to_i.positive?
    return 5 if connected_user_invested_amount.to_i.positive?
    return 4 if user_invested_amount.to_i.positive?
    return 3 if user.subscribing.find_by(user_id: connected_user_id).present? && connected_user.subscribing.find_by(user_id: user_id).present?
    return 2 if connected_user.subscribing.find_by(user_id: user_id).present?
    return 1 if user.subscribing.find_by(user_id: connected_user_id).present?
  end

  def calculate_connection_types(user_invested_amount, connected_user_invested_amount)
    connection_types << SPONSOR if users_with_wallets_connected? && connected_user_sponsoring_user?
    connection_types << STAKER if connected_user_invested_amount.to_i.positive?
    connection_types << SUBSCRIBER if connected_user.subscribing.find_by(user_id: user_id).present?

    connection_types << SPONSORING if users_with_wallets_connected? && user_sponsoring_connected_user?
    connection_types << STAKING if user_invested_amount.to_i.positive?
    connection_types << SUBSCRIBING if user.subscribing.find_by(user_id: connected_user_id).present?

    connection_types.uniq
  end

  def users_with_wallets_connected?
    connected_user.wallet_id && user.wallet_id
  end

  def user_sponsoring_connected_user?
    Sponsorship.claimed.where(sponsor: user.wallet_id, talent: connected_user.wallet_id).any?
  end

  def connected_user_sponsoring_user?
    Sponsorship.claimed.where(sponsor: connected_user.wallet_id, talent: user.wallet_id).any?
  end
end
