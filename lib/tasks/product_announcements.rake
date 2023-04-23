namespace :product_announcements do
  # rake "product_announcements:create_from_json[spec/fixtures/files/product_announcements/new_support_model.json]"
  desc "Create a product announcement from JSON file"
  task :create_from_json, [:json_path] => :environment do |_t, args|
    json_path = args.json_path
    unless json_path.match?(/.?.json/)
      puts "Invalid JSON file"
      next
    end

    json_data = json_path.starts_with?("http") ? URI.parse(json_path).read : File.read(json_path)
    params = JSON.parse(json_data).slice(*ProductAnnouncements::Create::ATTRIBUTES + %w[image_url])
    product_announcement = ProductAnnouncements::Create.new(params:).call
    puts "Successfully created product announcement - #{product_announcement.title}"
  rescue ProductAnnouncements::Create::Error => error
    puts "Could not create product announcement: #{error.message}"
  end
end
