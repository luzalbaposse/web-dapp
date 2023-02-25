if ENV["GITHUB_ARTIFACTS"]
  require "simplecov"
  require "codecov"

  SimpleCov.add_filter "db/migrate"
  SimpleCov.command_name "#{SimpleCov::CommandGuesser.guess} #{(ENV["CI_NODE_INDEX"].to_i + 1) || "1"}"

  SimpleCov.formatter = SimpleCov::Formatter::Codecov

  dir = File.join(ENV["GITHUB_ARTIFACTS"], "simplecov-#{ENV["PROJECT_UNDER_TEST"]}-#{ENV["CI_NODE_INDEX"] || "0"}")
  SimpleCov.coverage_dir(dir)

  SimpleCov.start "rails"
end

# This file is copied to spec/ when you run 'rails generate rspec:install'
require "spec_helper"
require "sidekiq/testing"

ENV["RAILS_ENV"] ||= "test"

require File.expand_path("../config/environment", __dir__)

# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?

require "rspec/rails"
require "clearance/rspec"

Dir[Rails.root.join("spec", "support", "**", "*.rb")].sort.each { |f| require f }

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true

  config.include ActiveSupport::Testing::TimeHelpers

  config.include JsonHelper, type: :request

  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!

  ActiveJob::Base.queue_adapter = :test

  config.before(:each) do
    Sidekiq::Worker.clear_all
  end

  config.before(:each) do |example|
    if Bullet.enable?
      Bullet.start_request
    end
  end

  config.after(:each) do
    if Bullet.enable?
      Bullet.perform_out_of_channel_notifications if Bullet.notification?
      Bullet.end_request
    end
  end
end
