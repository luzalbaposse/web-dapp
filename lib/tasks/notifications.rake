namespace :notifications do
  desc "Send email notifications to admin"
  # rake "notifications:send_emails_to_admin[1]"
  task :send_emails_to_admin, [:user_id] => :environment do |_t, args|
    user = User.find_by(id: args.user_id, role: "admin")
    raise "Cannot find admin with id #{args.user_id}" unless user

    UserMailer.with(user_id: user.id).send_sign_up_email.deliver_later
    UserMailer.with(user:).send_password_reset_email.deliver_later
    UserMailer.with(user:).send_welcome_email.deliver_later
    UserMailer.with(user:).send_token_launch_reminder_email.deliver_later
    UserMailer.with(user:).send_token_launched_email.deliver_later
    UserMailer.with(user:).send_token_purchase_reminder_email.deliver_later
    UserMailer.with(user:).send_complete_profile_reminder_email.deliver_later
    UserMailer.with(recipient: user).send_completed_profile_email.deliver_later
    UserMailer.with(source_id: user.id).send_verified_profile_email.deliver_later
    UserMailer.with(reason: "name", source_id: user.id).send_verification_failed_email.deliver_later
    UserMailer.with(recipient: user).send_application_received_email.deliver_later
    UserMailer.with(recipient: user).send_application_approved_email.deliver_later
    UserMailer.with(user:).send_opportunities_open_roles_email.deliver_later
    UserMailer.with(user:).send_opportunities_hiring_email.deliver_later
  end
end
