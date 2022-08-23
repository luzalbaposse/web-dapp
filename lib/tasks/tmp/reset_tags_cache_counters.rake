namespace :tags do
  task reset_cache_counters: :environment do
    Tag.find_each do |tag|
      Tag.reset_counters(tag.id, :user_tags)
    end
  end
end
