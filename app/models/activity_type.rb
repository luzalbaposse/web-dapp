class ActivityType < ApplicationRecord
  validates :activity_type, presence: true, uniqueness: true

  has_many :activities, class_name: "Activity", foreign_key: "activity_type_id"
end
