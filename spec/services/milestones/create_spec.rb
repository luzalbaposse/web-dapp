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

  let(:profile_completeness_class) { Users::UpdateProfileCompleteness }
  let(:profile_completeness_instance) { instance_double(profile_completeness_class, call: true) }

  before do
    allow(profile_completeness_class).to receive(:new).and_return(profile_completeness_instance)
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

  it "initializes and calls the update profile completeness" do
    create_milestone

    expect(profile_completeness_class).to have_received(:new).with(
      user: user
    )
    expect(profile_completeness_instance).to have_received(:call)
  end
end
