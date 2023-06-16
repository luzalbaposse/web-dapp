namespace :goals do
  desc "Update progress naming for goals"
  task update_progress_naming: :environment do
    new_mapping = {
      planned: "planned",
      executing: "doing",
      accomplished: "accomplished",
      not_accomplished: "abandoned",
      abandoned: "abandoned"
    }

    Goal.find_each do |goal|
      next unless goal.progress

      goal.update!(progress: new_mapping.stringify_keys![goal.progress])
    end

    puts "Done."
  end

  task update_progress_for_abandoned_goals: :environment do
    goals = Goal.where(progress: ["planned", "doing"]).where("due_date < ?", 1.month.ago)

    goals.find_each do |goal|
      goal.update!(progress: Goal::ABANDONED)

      UserMailer
        .with(goal: goal, user: goal.career_goal.talent.user)
        .send_goal_30_days_past_due_date_reminder_email
        .deliver_later
    end
  end
end
