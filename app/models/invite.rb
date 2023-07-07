class Invite < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :partnership, optional: true
  belongs_to :user, optional: true

  has_many :invitees, class_name: "User", inverse_of: :invited

  validate :one_associated_record
  validates :code, presence: true

  INVITE_CODE_SIZE = 8

  scope :common, -> { where(talent_invite: false) }

  def active?
    max_uses.nil? || uses < max_uses
  end

  def invites_left
    if max_uses.nil?
      (uses > 0) ? uses : 1
    else
      max_uses - uses
    end
  end

  def name
    return organization.name if organization
    return partnership.name if partnership
    return user.name if user
  end

  def profile_picture_url
    return organization.logo_url if organization
    return partnership.logo_url if partnership
    return user.profile_picture_url if user
  end

  def self.generate_code
    SecureRandom.hex(INVITE_CODE_SIZE)
  end

  private

  def one_associated_record
    errors.add(:base, "Organization, partnership and user can't all be blank") unless organization || partnership || user
    errors.add(:base, "Only one association can be present") if organization && partnership || organization && user || partnership && user
  end
end
