class CareerUpdateAssociation < ApplicationRecord
  belongs_to :career_update
  belongs_to :associable_entity, polymorphic: true
end
