require "rails_helper"

RSpec.describe Goals::Create do
  include ActiveJob::TestHelper

  subject(:create_goal) { described_class.new(career_goal:, current_user:, params:).call }

  let(:user) { create :user, :with_talent }
  let(:career_goal) { create :career_goal, talent: user.talent }
  let(:current_user) { create :user }
  let(:params) do
    {
      due_date: "01-05-2023",
      images: []
    }
  end

  it "enqueues two jobs to refresh user quests" do
    Sidekiq::Testing.inline! do
      create_goal

      job = enqueued_jobs.find { |j| j["job_class"] == "Quests::RefreshUserQuestsJob" }

      aggregate_failures do
        expect(job["arguments"][0]).to eq(user.id)
      end
    end
  end
end
