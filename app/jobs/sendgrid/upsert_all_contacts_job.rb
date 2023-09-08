require "sendgrid/contacts/upsert"

class Sendgrid::UpsertAllContactsJob < ApplicationJob
  queue_as :default

  def perform
    Sendgrid::Contacts::Upsert.new.call
  end
end
