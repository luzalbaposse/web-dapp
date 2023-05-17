require "rails_helper"

RSpec.describe Milestones::Create do
  include ActiveJob::TestHelper

  subject(:create_milestone) { described_class.new(talent:, current_user:, params:).call }

  let(:user) { create :user, :with_talent }
  let(:talent) { user.talent }
  let(:career_goal) { create :career_goal, talent: user.talent }
  let(:current_user) { create :user }
  let(:params) do
    {
      title: "My first job",
      start_date: "01-05-2023",
      end_date: "01-09-2023",
      images: []
    }
  end

  it "enqueues a job to refresh user quests" do
    Sidekiq::Testing.inline! do
      create_milestone

      job = enqueued_jobs.find { |j| j["job_class"] == "Quests::RefreshUserQuestsJob" }

      aggregate_failures do
        expect(job["arguments"][0]).to eq(user.id)
      end
    end
  end
end
