namespace :experience_rewards do
  desc "Adds the initial rewards"
  # rake experience_rewards:initial_setup
  task initial_setup: :environment do
    puts "Setting up Rewards"

    er_tiny_tal = ExperienceReward.find_or_initialize_by(title: "10 $TAL Tokens")
    er_tiny_tal.description = "Connect your wallet and claim 10 $TAL Tokens to your Talent Protocol wallet."
    er_tiny_tal.cost = 2000
    er_tiny_tal.stock = nil
    er_tiny_tal.active = true
    er_tiny_tal.type = "ExperienceRewards::TinyTal"
    er_tiny_tal.image_attacher.context[:url] = true
    er_tiny_tal.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/fe1454ff-94d7-4caa-b299-394a0be10a3b/10_tal.png?id=84297d63-d83a-4baf-bf0c-1e2145d604d7&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=FIzygTec9SlBf747e2krv0TRXJxGsqVJUZh3BdjNe10&downloadName=10+tal.png")
    er_tiny_tal.save!
    puts "Created ##{er_tiny_tal.id} - #{er_tiny_tal.title}"

    er_small_tal = ExperienceReward.find_or_initialize_by(title: "500 $TAL Tokens")
    er_small_tal.description = "Connect your wallet and claim 500 $TAL Tokens to your Talent Protocol wallet."
    er_small_tal.cost = 10000
    er_small_tal.stock = nil
    er_small_tal.active = true
    er_small_tal.type = "ExperienceRewards::SmallTal"
    er_small_tal.image_attacher.context[:url] = true
    er_small_tal.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/c71433aa-3811-4000-9485-21d5c8c6c61f/500_tal.png?id=2a217e12-6b23-4294-aa5a-0e9765764f3e&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=qVtFOUFI96ykXhfI8t_qjC31O53hotgmsmu3z0HqJkg&downloadName=500+tal.png")
    er_small_tal.save!
    puts "Created ##{er_small_tal.id} - #{er_small_tal.title}"

    er_tshirt = ExperienceReward.find_or_initialize_by(title: "Talent T-shirt")
    er_tshirt.description = "Claim your reward to unlock an exclusive promo code for your favorite t-shirt!"
    er_tshirt.cost = 15000
    er_tshirt.active = true
    er_tshirt.stock = 200
    er_tshirt.type = "ExperienceRewards::Tshirt"
    er_tshirt.image_attacher.context[:url] = true
    er_tshirt.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/c1c85cd9-c627-4720-b8c1-48f491bfe34c/tee.png?id=7e394373-f5b0-4084-9a6a-06fdda04c587&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=qvRJKCc0PexAzKakBnQDN5tuJ8SIU72VtMs1_BuAjPY&downloadName=tee.png")
    er_tshirt.save!
    puts "Created ##{er_tshirt.id} - #{er_tshirt.title}"

    er_med_tal = ExperienceReward.find_or_initialize_by(title: "1,000 $TAL Tokens")
    er_med_tal.description = "Connect your wallet and claim 1,000 $TAL Tokens to your Talent Protocol wallet."
    er_med_tal.cost = 20000
    er_med_tal.active = true
    er_med_tal.stock = 1000
    er_med_tal.type = "ExperienceRewards::MediumTal"
    er_med_tal.image_attacher.context[:url] = true
    er_med_tal.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/733a3438-6bfd-478a-9dca-ab4cbb23f1a8/1000_tal.png?id=96e512e1-9b74-4c8b-bb82-52ad9f6bfd81&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=jodWVIsQzs7sAz9ebABN-8c1q-CdQOoEh-EC8NznM6o&downloadName=1000+tal.png")
    er_med_tal.save!
    puts "Created ##{er_med_tal.id} - #{er_med_tal.title}"

    er_cap = ExperienceReward.find_or_initialize_by(title: "Talent Cap")
    er_cap.description = "Claim your reward to unlock an exclusive promo code for your favorite cap!"
    er_cap.cost = 25000
    er_cap.active = true
    er_cap.stock = 100
    er_cap.type = "ExperienceRewards::Cap"
    er_cap.image_attacher.context[:url] = true
    er_cap.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/f5316edf-16e0-40ac-a18b-a22f9fc373fc/cap.png?id=44dd16dc-e9fa-4726-952a-f0f651295f7b&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=ebG1c4AHhma28P1M_7F1oqgqN4VQhDtBN89ZvqZqEmg&downloadName=cap.png")
    er_cap.save!
    puts "Created ##{er_cap.id} - #{er_cap.title}"

    er_lg_tal = ExperienceReward.find_or_initialize_by(title: "2,000 $TAL Tokens")
    er_lg_tal.description = "Connect your wallet and claim 2,000 $TAL Tokens to your Talent Protocol wallet."
    er_lg_tal.cost = 30000
    er_lg_tal.active = true
    er_lg_tal.stock = 500
    er_lg_tal.type = "ExperienceRewards::LargeTal"
    er_lg_tal.image_attacher.context[:url] = true
    er_lg_tal.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/489af03e-ffc0-46db-916d-90f4b7bdcafa/2000_tal.png?id=24c1a027-d250-481d-9180-81244b2d6471&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=4fTgT5WF2uMIame5-04SxSI8DTyrTCdyiPpBUvej8bc&downloadName=2000+tal.png")
    er_lg_tal.save!
    puts "Created ##{er_lg_tal.id} - #{er_lg_tal.title}"

    er_sweater = ExperienceReward.find_or_initialize_by(title: "Talent Sweater")
    er_sweater.description = "Claim your reward to unlock an exclusive promo code for your favorite sweater!"
    er_sweater.cost = 35000
    er_sweater.active = true
    er_sweater.stock = 50
    er_sweater.type = "ExperienceRewards::Sweater"
    er_sweater.image_attacher.context[:url] = true
    er_sweater.image = Down.open("https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/5847f840-7ac9-4b66-a470-295432756e0f/sweater.png?id=034b84ca-bc5d-4b26-9d11-402f2ffdb957&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1694095200000&signature=7f3aE-D3KO7yxRnCdevj9LWLghAguJFNsnLtVYnxXxo&downloadName=sweater.png")
    er_sweater.save!
    puts "Created ##{er_sweater.id} - #{er_sweater.title}"
  end
end
