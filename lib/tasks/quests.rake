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
        title: "Connect wallet",
        description: "Link your wallet to your profile.",
        quest_type: "connect_wallet",
        experience_points_amount: 200
      },
      {
        title: "Subscribe to 3+ Talent",
        description: "Subscribe to receive career updates from 3+ talent.",
        quest_type: "three_talent_subscribe",
        experience_points_amount: 300
      },
      {
        title: "Add 3+ Journey Entries",
        description: "Add at least 3 entries between goals, positions and/or education",
        quest_type: "three_journey_entries",
        experience_points_amount: 400
      },
      {
        title: "Complete Your Profile",
        description: "Add information to your profile and check your progress on the homepage.",
        quest_type: "complete_profile",
        experience_points_amount: 1500
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
      },
      {
        title: "Verify Your Humanity",
        description: "Validate you are a human using Worldcoin.",
        quest_type: "verify_humanity",
        experience_points_amount: 1000,
        sponsored: true
      },
      {
        title: "Create your Talent Mate",
        description: "Mint your mate NFT, exclusive for Talent Protocol verified members.",
        quest_type: "create_talent_mate",
        experience_points_amount: 750
      },
      {
        title: "Get 3+ Token Holders",
        description: "Launch your Talent Token and get 3 people to stake on you.",
        quest_type: "three_token_holders",
        experience_points_amount: 2000
      },
      {
        title: "Sponsor a Talent",
        description: "Help a talent financially with $5 or more.",
        quest_type: "sponsor_talent",
        experience_points_amount: 2500
      },
      {
        title: "Invite 3+ Friends",
        description: "Get 3+ friends to sign up and verify their account.",
        quest_type: "invite_three",
        experience_points_amount: 1000
      }
    ]

    quests.each do |quest_data|
      Quest.find_or_create_by!(quest_data)
    end
  end

  task refresh_users_quests: :environment do
    User.find_each do |user|
      Quests::RefreshUserQuestsJob.perform_later(user.id, false)
    end
  end
end
