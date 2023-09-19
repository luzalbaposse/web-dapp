class Vote < ApplicationRecord
  belongs_to :election
  belongs_to :candidate, class_name: "User", foreign_key: "candidate_id"
  belongs_to :voter, class_name: "User", foreign_key: "voter_id"
end
