require "rails_helper"

RSpec.describe Users::Verify do
  include ActiveJob::TestHelper

  subject(:verify_user) { described_class.new(user: user).call }

  let(:user) { create :user }
  let!(:talent) { create :talent, user: user }

  it "verifies the user" do
    verify_user

    expect(talent.verified).to be(true)
  end

  it "enqueues the job to update verify activity" do
    Sidekiq::Testing.inline! do
      verify_user

      job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

      aggregate_failures do
        expect(job["arguments"][0]).to eq("verify")
        expect(job["arguments"][1]).to eq(nil)
        expect(job["arguments"][2]).to eq(user.id)
      end
    end
  end

  it "enqueues the job to whitelist the user" do
    Sidekiq::Testing.inline! do
      verify_user

      job = enqueued_jobs.find { |j| j["job_class"] == "WhitelistUserJob" }

      aggregate_failures do
        expect(job["arguments"][0]["user_id"]).to eq(user.id)
        expect(job["arguments"][0]["level"]).to eq("verified")
      end
    end
  end
end
