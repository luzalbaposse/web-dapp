require "discord/accomplished_goal_notification"
require "rails_helper"

RSpec.describe Discord::AccomplishedGoalNotification do
  let(:goal) { create :goal, progress:, title: "Become a CEO", user: }
  let(:user) { create :user, display_name: "John", username: "john" }
  let(:progress) { Goal::ACCOMPLISHED }

  before do
    ENV["DISCORD_ACCOMPLISHED_GOALS_CHANNEL_WEBHOOK_URL"] = "https://discordapp.com/api/webhooks/123/abc"

    stub_request(:post, ENV["DISCORD_ACCOMPLISHED_GOALS_CHANNEL_WEBHOOK_URL"])
  end

  subject { described_class.new(goal:) }

  describe "#call" do
    it "makes a request to post a message to the Discord webhook URL" do
      subject.call

      expect(
        a_request(:post, ENV["DISCORD_ACCOMPLISHED_GOALS_CHANNEL_WEBHOOK_URL"])
          .with(
            body: {content: "_John_ just accomplished their goal: **Become a CEO**. Check out their profile: https://beta.talentprotocol.com/u/john"},
            headers: {"Content-Type": "application/json"}
          )
      )
        .to have_been_made
        .once
    end
  end
end
