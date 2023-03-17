class CareerUpdate < ApplicationRecord
  belongs_to :user
  has_encrypted :text

  validates :text_ciphertext, presence: true
end
