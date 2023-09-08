source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.4"

gem "rails", "7.0.4.1"
gem "pg", "~> 1.1"
gem "puma", "~> 5.6"

# Frontend Dependencies
gem "sass-rails", ">= 6"
gem "webpacker", github: "rails/webpacker", branch: "master"
gem "jbuilder"
gem "react_on_rails", "= 12.2.0"
gem "mini_racer", platforms: :ruby

# Email
gem "bootstrap-email"
gem "sendgrid-ruby"

# Auth
gem "clearance"

# Throttle requests
gem "rack-attack"

# Web 3
gem "eth"

# Crypto
gem "lockbox" # for application level encryption
gem "blind_index" # for searchable encryption

# Pagination
gem "pagy"
gem "pagy_cursor"

# Use Redis adapter to run Action Cable in production
gem "redis", "~> 4.3"
gem "bcrypt"

# Image manipulation
gem "rmagick"

# File Attachment toolkit
gem "shrine", "~> 3.0"
gem "marcel", "~> 1.0" # mime-type analyzer
gem "aws-sdk-s3"
gem "aws-sdk-lambda"
gem "uppy-s3_multipart", "~> 1.0"
gem "image_processing", "~> 1.12", require: false

gem "bootsnap", require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# For data generation
gem "faker"

# Error tracking
gem "rollbar"

# Async jobs
gem "sidekiq", "~> 6.5.8"
gem "sidekiq-scheduler"
gem "sidekiq-status"

# Requests
gem "faraday"
gem "down"

# Prevent boot time warnings
gem "net-http"
gem "uri", "0.10.3"
gem "matrix", "~> 0.4.2"

# GraphQL
gem "graphql-client"

# JSON Object Presenter
gem "blueprinter"

# Notifications
gem "noticed", "~> 1.5"

# Perfomance monitoring
gem "newrelic_rpm"

# Slug generation
gem "friendly_id", "~> 5.4.0"

# Audits
gem "paper_trail"

# Data analytics
gem "blazer"
gem "google_drive"

group :development, :test do
  gem "awesome_print"
  gem "bundler-audit"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails"
  gem "factory_bot_rails", "~> 6.2.0"
  gem "pry-byebug"
  gem "pry-rails"
  gem "standard"
  gem "bullet"
  gem "rswag-specs"
end

group :development do
  gem "letter_opener_web"
  gem "web-console", ">= 4.1.0"
  gem "rack-mini-profiler", "~> 2.0"
  gem "listen", "~> 3.3"
  gem "spring"
  gem "foreman"
end

group :test do
  gem "rspec-rails"
  gem "shoulda-matchers", "~> 4.5.1"
  gem "webdrivers"
  gem "simplecov"
  gem "codecov"
  gem "webmock"
  gem "rails-controller-testing"
end
