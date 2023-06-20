class DiscoveryRow < ApplicationRecord
  extend FriendlyId

  belongs_to :partnership, optional: true
  belongs_to :user, optional: true

  has_many :tags
  has_many :visible_tags, -> { visible }, class_name: "Tag"

  validates :title, :slug, presence: true, uniqueness: true

  friendly_id :title, use: :slugged

  scope :with_completed_talents, -> do
    joins(tags: [user_tags: [user: :talent]])
      .where.not(user: {profile_completed_at: nil})
      .where(talent: {public: true, hide_profile: false})
      .distinct
  end

  def talents_count
    public_talent_profiles.count
  end

  def talents_total_supply
    public_talent_profiles.pluck(:total_supply).sum(&:to_i).to_s
  end

  private

  def public_talent_profiles
    Talent.base.profile_complete
      .joins(:talent_token)
      .joins(user: {tags: :discovery_row})
      .where(discovery_rows: {id: id})
      .distinct
  end
end
