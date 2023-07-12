namespace :organizations do
  desc "Create organization from JSON file"
  # rake "organizations:create_from_json[spec/fixtures/files/organizations/utrust.json, 4/5, 1/2/3, 4]"
  task :create_from_json, [:json_path, :tag_ids, :user_ids, :max_invite_uses] => :environment do |_t, args|
    json_path = args.json_path

    unless json_path.match?(/.?.json/)
      puts "Invalid JSON file" unless Rails.env.test?
      next
    end

    max_invite_uses = args.max_invite_uses&.to_i
    tags = Tag.where(id: args.tag_ids.split("/"))
    users = User.where(id: args.user_ids.split("/"))

    json_data = json_path.starts_with?("http") ? URI.parse(json_path).read : File.read(json_path)
    data = JSON.parse(json_data)
    params = data.slice(*Organizations::Create::ATTRIBUTES + %w[banner_url logo_url]).merge("tags" => tags)
    organization = Organizations::Create.new(params:, users:, max_invite_uses:).call

    puts "Successfully created organization - #{organization.name}" unless Rails.env.test?
  rescue Organizations::Create::Error => error
    puts "Could not create organization: #{error.message}"
  end

  desc "Convert partnerships to organizations"
  # rake "organizations:create_from_partnerships"
  task create_from_partnerships: :environment do
    Partnership.find_each do |partnership|
      invites = partnership.invites

      params = {
        banner_url: partnership.banner_url,
        description: partnership.description,
        location: partnership.location,
        logo_url: partnership.logo_url,
        name: partnership.name,
        twitter: partnership.twitter_url,
        type: "Organizations::Community",
        verified: true,
        website: partnership.website_url
      }

      users = User.where(invite_id: invites.pluck(:id))

      Organizations::Create.new(max_invite_uses: invites.first&.max_uses, params:, users: users || []).call

      puts "Successfully created organization from partnership #{partnership.name} (##{partnership.id})"
    rescue Organizations::Create::Error => error
      puts "Could not create organization from partnership #{partnership.name} (##{partnership.id}): #{error.message}"
    end
  end
end
