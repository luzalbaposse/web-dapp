namespace :users do
  task update_profile_completeness: :environment do
    desc "Update profile completeness % for all users"

    User.find_each do |user|
      Users::UpdateProfileCompleteness.new(user: user).call
    end

    TalentsIndex.import!
  end
end
