require "sendgrid/contacts/upsert"

namespace :sendgrid do
  desc "Upsert contacts"
  # rake sendgrid:upsert_contacts
  task upsert_contacts: :environment do
    confirmed_users = User.where.not(email_confirmed_at: nil)
    confirmed_users_with_talent_tokens = confirmed_users.joins(talent: :talent_token)
    confirmed_users_without_talent_tokens = confirmed_users.where.not(id: confirmed_users_with_talent_tokens)

    Sendgrid::Contacts::Upsert
      .new(user_ids: confirmed_users_without_talent_tokens.pluck(:id))
      .call

    Sendgrid::Contacts::Upsert
      .new(
        additional_list_ids: [ENV["SENDGRID_TALENT_TOKENS_V1_LIST_ID"]],
        user_ids: confirmed_users_with_talent_tokens.pluck(:id)
      )
      .call
  end
end
