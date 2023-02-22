class API::Key < ApplicationRecord
  self.table_name = "api_keys"

  validates :access_key, :name, presence: true

  def active?
    activated_at.present? && revoked_at.nil?
  end

  def activate!
    raise "Can't activate an already activated key" if activated_at
    raise "Can't activate a revoked key" if revoked_at

    update!(activated_at: Time.current)
  end

  def revoke!
    raise "Can't revoke an inactive key" unless activated_at
    raise "Can't revoke an already revoked key" if revoked_at

    update!(revoked_at: Time.current)
  end
end
