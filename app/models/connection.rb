class Connection < ApplicationRecord
  belongs_to :user
  belongs_to :connected_user, foreign_key: :connected_user_id, class_name: "User"

  validates :connected_at, presence: true
  validates :user_id, uniqueness: {scope: :connected_user_id}

  # Try reading it like this:
  # user is a super connection of connected_user
  # user is a supporter of connected_user
  # user is supporting the connected_user
  # user is subscribing and is a being subscribed by the connected_user
  # user is a subscriber of connected_user
  # user is subscribing the connected_user
  enum connection_type: {
    super_connection: 6,
    supporter: 5,
    supporting: 4,
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

    return destroy! unless connection_type

    update!(
      user_invested_amount: user_invested_amount,
      connected_user_invested_amount: connected_user_invested_amount,
      connection_type: connection_type,
      connected_at: connected_at
    )

    self
  end

  private

  def calculate_connection_type(user_invested_amount, connected_user_invested_amount)
    return 6 if user_invested_amount.to_i.positive? && connected_user_invested_amount.to_i.positive?
    return 5 if connected_user_invested_amount.to_i.positive?
    return 4 if user_invested_amount.to_i.positive?
    return 3 if user.subscribing.find_by(user_id: connected_user_id).present? && connected_user.subscribing.find_by(user_id: user_id).present?
    return 2 if user.subscribing.find_by(user_id: connected_user_id).present?
    return 1 if connected_user.subscribing.find_by(user_id: user_id).present?
  end
end
