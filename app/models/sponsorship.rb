class Sponsorship < ApplicationRecord
  validates :chain_id, :sponsor, :talent, :amount, :symbol, :token, presence: true

  scope :claimed, -> { where.not(claimed_at: nil) }
  scope :revoked, -> { where.not(revoked_at: nil) }
  scope :pending, -> { where(revoked_at: nil, claimed_at: nil) }

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
