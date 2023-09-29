class Organization < ApplicationRecord
  extend FriendlyId

  include ::ProfilePictureUploader::Attachment(:banner)
  include ::ProfilePictureUploader::Attachment(:logo)

  has_many :invites
  has_many :memberships, dependent: :destroy
  has_many :organization_tags, dependent: :destroy
  has_many :tags, through: :organization_tags
  has_many :users, through: :memberships
  has_many :elections, dependent: :destroy

  validates :priority, uniqueness: true, allow_nil: true
  validates :discord,
    :github,
    :linkedin,
    :telegram,
    :twitter,
    :website,
    allow_blank: true,
    format: {with: URI::DEFAULT_PARSER.make_regexp}

  validates :name, :slug, presence: true, uniqueness: true

  friendly_id :name, use: :slugged

  def active_election
    elections.active.take
  end
end
