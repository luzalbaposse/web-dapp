require "rails_helper"

RSpec.describe Tasks::Update do
  include ActiveJob::TestHelper

  subject(:update_task) { described_class.new }

  context "when the quest is the Talent Profile" do
    let(:talent) { create :talent, public: false }
    let(:user) { create :user, talent: talent }
    let(:quest) { create :quest, type: "Quests::TalentProfile", status: "pending", user: user }
    let(:task) { create :task, :highlights, quest: quest }

    it "makes the talent public if the quest is completed" do
      update_task.call(type: task.type, user: user)

      expect(user.talent.public).to eq true
    end

    it "creates a new notification" do
      update_task.call(type: task.type, user: user)

      created_notification = Notification.last

      aggregate_failures do
        expect(created_notification.type).to eq "Quests::CompletedTalentProfileNotification"
        expect(created_notification.params).to eq(
          {
            "type" => quest.short_type,
            "model_id" => quest.id,
            "source_id" => user.id
          }
        )
      end
    end

    it "enqueues the activity ingest job to add the new user to the activity feed" do
      Sidekiq::Testing.inline! do
        update_task.call(type: task.type, user: user)

        job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("ActivityIngestJob")
          expect(job["arguments"][0]).to eq("profile_complete")
          expect(job["arguments"][2]).to eq(user.id)
          expect(job["arguments"][3]).to eq(nil)
        end
      end
    end

    it "assigns a 50 TAL reward to the user" do
      update_task.call(type: task.type, user: user)

      expect(user.rewards.length).to eq 1
      reward = user.rewards.first

      expect(reward.amount).to eq 50
    end
  end
end
