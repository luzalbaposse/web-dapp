require "sendgrid/contacts/delete"

class Sendgrid::DeleteAllContactsJob < ApplicationJob
  queue_as :default

  def perform
    Sendgrid::Contacts::Delete.new.call
  end
end
