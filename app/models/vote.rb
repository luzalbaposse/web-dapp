class Vote < ApplicationRecord
  belongs_to :election
  belongs_to :candidate, class_name: "User", foreign_key: "candidate_id"
  belongs_to :voter, class_name: "User", foreign_key: "voter_id", optional: true

  validates :wallet_id, :cost, presence: true

  ADVISORY_LOCK_NAMESPACE = 1

  def name
    "New votes for #{election.organization.name}"
  end
end
