require "sendgrid/contacts/delete"

class Sendgrid::DeleteContactJob < ApplicationJob
  queue_as :default

  def perform(email)
    Sendgrid::Contacts::Delete.new(emails: email).call
  end
end
