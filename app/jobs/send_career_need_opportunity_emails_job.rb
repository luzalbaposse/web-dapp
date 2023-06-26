class SendCareerNeedOpportunityEmailsJob < ApplicationJob
  queue_as :default

  def perform
    send_opportunities_open_roles_emails
  end

  private

  def send_opportunities_open_roles_emails
    User
      .joins(talent: {career_goal: :career_needs})
      .left_outer_joins(:user_email_log)
      .where(career_needs: {title: CareerNeed::ROLE_NEEDS})
      .where("sent_at_data ->> 'opportunities_open_roles' IS ? OR sent_at_data ->> 'opportunities_open_roles' < ?", nil, three_months_ago)
      .distinct
      .find_each do |user|
        UserMailer.with(user: user).send_opportunities_open_roles_email.deliver_later
        persist_sent_at(email: "opportunities_open_roles", user: user)
      end
  end

  def three_months_ago
    Time.current - 3.months
  end

  def persist_sent_at(email:, user:)
    user_email_log = user.user_email_log || user.build_user_email_log
    user_email_log.sent_at_data[email] = Time.current
    user_email_log.save!
  end
end
