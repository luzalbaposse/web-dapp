class Membership < ApplicationRecord
  belongs_to :organization, counter_cache: true
  belongs_to :user
end
