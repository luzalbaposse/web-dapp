class WalletActivity < ApplicationRecord
  validates :chain_id, :tx_date, :token, :wallet, :symbol, :tx_hash, presence: true

  belongs_to :user
end
