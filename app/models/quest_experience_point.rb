class QuestExperiencePoint < ApplicationRecord
  belongs_to :quest

  validates :amount, presence: true
  validates :rule, allow_blank: true, uniqueness: {scope: :quest_id}
end
