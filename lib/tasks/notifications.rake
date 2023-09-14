namespace :notifications do
  desc "Send email notifications to admin"
  # rake "notifications:send_emails_to_admin[1]"
  task :send_emails_to_admin, [:user_id] => :environment do |_t, args|
    user = User.find_by(id: args.user_id, role: "admin")
    raise "Cannot find admin with id #{args.user_id}" unless user

    UserMailer.with(user_id: user.id).send_sign_up_email.deliver_later
    UserMailer.with(user:).send_password_reset_email.deliver_later
    UserMailer.with(source_id: user.id).send_verified_profile_email.deliver_later
    UserMailer.with(reason: "name", source_id: user.id).send_verification_failed_email.deliver_later
    UserMailer.with(token: "test", user: user).send_confirm_account_deletion_email.deliver_later
    UserMailer.with(goal: Goal.first, user: user).send_goal_deadline_reminder_email.deliver_later
    UserMailer.with(goal: Goal.first, user: user).send_goal_due_in_one_month_reminder_email.deliver_later
    UserMailer.with(career_update_id: CareerUpdate.last&.id, source_id: user.id, recipient: user).send_career_update_created_email.deliver_later
    SubscriptionMailer.with(recipient_id: user.id).subscription_request_email.deliver_later
    SubscriptionMailer.with(recipient: user, source_id: user.id).subscription_accepted_email.deliver_later
    SponsorshipMailer.with(recipient: user, source_id: user.id).new_sponsor_email.deliver_later
  end
end
