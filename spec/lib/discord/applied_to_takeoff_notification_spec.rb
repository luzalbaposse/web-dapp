require "discord/applied_to_takeoff_notification"
require "rails_helper"

RSpec.describe Discord::AppliedToTakeoffNotification do
  let(:goal) { create :goal, title: "Become a CEO", user:, election: election }
  let(:user) { create :user, display_name: "John", username: "john" }
  let(:organization) { create :org_election, slug: "takeoff-istanbul" }
  let(:election) { create :election, organization: organization }

  before do
    ENV["DISCORD_TAKEOFF_APPLICATIONS_WEBHOOK_URL"] = "https://discordapp.com/api/webhooks/123/abc"

    stub_request(:post, ENV["DISCORD_TAKEOFF_APPLICATIONS_WEBHOOK_URL"])
  end

  subject { described_class.new(goal:) }

  describe "#call" do
    it "makes a request to post a message to the Discord webhook URL" do
      subject.call

      expect(
        a_request(:post, ENV["DISCORD_TAKEOFF_APPLICATIONS_WEBHOOK_URL"])
          .with(
            body: {content: "_John_ just applied to Take Off Istanbul! Check out their profile and their application: https://beta.talentprotocol.com/u/john"},
            headers: {"Content-Type": "application/json"}
          )
      )
        .to have_been_made
        .once
    end
  end
end
