class OrganizationTag < ApplicationRecord
  belongs_to :tag
  belongs_to :organization
end
