class Sponsorship < ApplicationRecord
  validates :chain_id, :sponsor, :talent, :amount, :symbol, :token, presence: true

  def status
    return "claimed" if claimed_at.present?
    return "revoked" if revoked_at.present?

    "pending"
  end

  def sponsor_user
    User.find_by(wallet_id: sponsor)
  end

  def talent_user
    User.find_by(wallet_id: talent)
  end
end
