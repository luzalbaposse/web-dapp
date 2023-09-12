require "sendgrid/contacts/delete"

class Sendgrid::DeleteNonMemberContactsJob < ApplicationJob
  queue_as :default

  def perform
    Sendgrid::Contacts::Delete.new(emails:).call
  end

  private

  def emails
    User
      .where("last_access_at = CURRENT_DATE - 181")
      .where
      .not(email_confirmed_at: nil)
      .pluck(:email)
  end
end
