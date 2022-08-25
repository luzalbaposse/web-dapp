require "linkedin/client"
require "rails_helper"

RSpec.describe Linkedin::Client do
  let(:client) { described_class.new }

  describe "#retrieve_access_token" do
    let(:code) { "code" }

    before do
      ENV["LINKEDIN_CLIENT_ID"] = "client_id"
      ENV["LINKEDIN_CLIENT_SECRET"] = "client_secret"
      ENV["LINKEDIN_REDIRECT_URI"] = "redirect_uri"

      stub_request(:post, described_class::ACCESS_TOKEN_URI)
    end

    it "makes a request to retrieve an access token" do
      client.retrieve_access_token(code)

      expect(
        a_request(:post, described_class::ACCESS_TOKEN_URI)
          .with(
            body: {
              client_id: ENV["LINKEDIN_CLIENT_ID"],
              client_secret: ENV["LINKEDIN_CLIENT_SECRET"],
              code: code,
              grant_type: "authorization_code",
              redirect_uri: ENV["LINKEDIN_REDIRECT_URI"]
            },
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
          )
      )
        .to have_been_made
        .once
    end
  end

  describe "#retrieve_email_address" do
    let(:access_token) { "access_token" }

    before do
      stub_request(:get, described_class::EMAIL_ADDRESS_URI)
    end

    it "makes a request to retrieve an email address" do
      client.retrieve_email_address(access_token)

      expect(
        a_request(:get, described_class::EMAIL_ADDRESS_URI)
          .with(headers: {Authorization: "Bearer #{access_token}"})
      )
        .to have_been_made
        .once
    end
  end

  describe "#retrieve_lite_profile" do
    let(:access_token) { "access_token" }

    before do
      stub_request(:get, described_class::LITE_PROFILE_URI)
    end

    it "makes a request to retrieve a lite profile" do
      client.retrieve_lite_profile(access_token)

      expect(
        a_request(:get, described_class::LITE_PROFILE_URI)
          .with(headers: {Authorization: "Bearer #{access_token}"})
      )
        .to have_been_made
        .once
    end
  end
end
