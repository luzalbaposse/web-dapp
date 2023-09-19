# frozen_string_literal: true

namespace :collective do
  task create_takeoff_Istanbul: :environment do
    puts "Setting up Take Off Istanbul Collective"
    logo = "https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/da38767a-19d8-4385-985b-98af50de821c/takeoff-logo.png?id=6aac63d5-ed89-4804-a911-c80399837f60&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1695117600000&signature=Nr7aGJFrwwBVxJsqE0-UQQUKV_P-69a5PJmHTXgvIKc&downloadName=takeoff-logo.png"
    banner = "https://file.notion.so/f/f/16cd58fd-bb08-46b6-817c-f2fce5ebd03d/dfeca599-9fb5-4417-a53a-a23586b0a45d/takeoff-banner.png?id=f7cbe2fb-3b80-42c3-ae9d-97f087f61549&table=block&spaceId=16cd58fd-bb08-46b6-817c-f2fce5ebd03d&expirationTimestamp=1695117600000&signature=Z3--R5dkL26rvBYzPiJUGDIx2ZaqxEovO-cJesjHzRo&downloadName=takeoff-banner.png"
    tags = ["Community", "Scholarship", "Web3"]
    slug = "takeoff-istanbul"

    org = Organization.find_or_initialize_by(slug: slug)
    org.name = "Take Off Istanbul"
    org.slug = slug
    org.website = "https://takeoff.talentprotocol.com/"
    org.description = "Vote on your favorite candidate to win a scholarship for DevConnect. Every vote has a cost in $TAL, but if you predict the winner(s), you'll win a prize."
    org.verified = true
    org.type = "Organizations::Election"
    org.location = "Istanbul, Turkey"
    if org.new_record?
      tags.each do |tag|
        org.tags << Tag.find_or_create_by(description: tag)
      end

      org.logo_attacher.context[:url] = true
      org.logo = Down.open(logo)

      org.banner_attacher.context[:url] = true
      org.banner = Down.open(banner)
    end

    org.save!
    puts "Successfully created organization - #{org.name}"

    # Create election
    puts "Creating election for Takeoff Istanbul"
    election = Election.find_or_initialize_by(organization_id: org.id)
    election.start_date = Rails.env.production? ? Date.parse("2023-09-20") : Date.parse("2023-09-13")
    election.voting_start_date = Rails.env.production? ? Date.parse("2023-09-26") : Date.parse("2023-09-13")
    election.voting_end_date = Rails.env.production? ? Date.parse("2023-10-06") : Date.parse("2023-09-22")
    election.save!
    puts "Successfully created election for #{org.name}"
  end
end
