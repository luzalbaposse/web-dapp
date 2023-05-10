class Activity < ApplicationRecord
  belongs_to :origin_user, class_name: "User"
  belongs_to :target_user, class_name: "User", optional: true
end
