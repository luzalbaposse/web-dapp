namespace :quests do
  task create_initial_quests: :environment do
    quests = [
      {
        title: "Profile Picture",
        description: "Upload a picture of you to your profile.",
        quest_type: "profile_picture",
        experience_points_amount: 100
      },
      {
        title: "Subscribe to 3+ Talent",
        description: "Subscribe to receive career updates from 3+ talent.",
        quest_type: "three_talent_subscribe",
        experience_points_amount: 300
      },
      {
        title: "Add 3+ Journey Entries",
        description: "Add at least 3 goals, positions, or education to your profile.",
        quest_type: "three_journey_entries",
        experience_points_amount: 400
      },
      {
        title: "Verify Your Identity",
        description: "Complete the KYC process and receive a verified checkmark.",
        quest_type: "verify_identity",
        experience_points_amount: 1000
      },
      {
        title: "Get 5+ Subscribers",
        description: "Accept at least 5 subscription requests.",
        quest_type: "five_subscribers",
        experience_points_amount: 1250
      },
      {
        title: "Send a Career Update",
        description: "Write your first Career Update and share it with your supporters.",
        quest_type: "send_career_update",
        experience_points_amount: 1000
      },
      {
        title: "Stake on 3+ Talent",
        description: "Buy $10 worth of Talent Tokens from 3 different users.",
        quest_type: "supporting_three",
        experience_points_amount: 3000
      }
    ]

    quests.each do |quest_data|
      V2Quest.create!(quest_data)
    end
  end

  task refresh_users_quests: :environment do
    User.find_each do |user|
      Quests::RefreshUserQuestsJob.perform_later(user.id)
    end
  end
end
