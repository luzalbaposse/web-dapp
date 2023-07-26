require "rails_helper"

RSpec.describe CareerNeeds::Upsert do
  include ActiveJob::TestHelper

  let(:user) { create :user }
  let(:talent) { create :talent, user: user }
  let(:career_goal) { create :career_goal, talent: talent }
  let(:titles) { ["Internships"] }

  subject(:upsert_career_needs) do
    described_class.new(career_goal: career_goal, titles: titles)
  end

  describe "#call" do
    it "creates the career need" do
      expect { subject.call }.to change { CareerNeed.count }.by(1)

      career_need = CareerNeed.last

      aggregate_failures do
        expect(career_need.career_goal).to eq(career_goal)
        expect(career_need.title).to eq("Internships")
      end
    end

    context "when the career need exists for the career goal already" do
      let!(:career_need) do
        create :career_need, career_goal: career_goal, title: "Internships"
      end

      it "does not create the career need" do
        expect { subject.call }.not_to change(CareerNeed, :count)
      end
    end

    context "when the career goal has a career need that is not included in the passed titles" do
      let!(:career_need) do
        create :career_need, career_goal: career_goal, title: "Finding a co-founder"
      end

      it "destroy the career need" do
        subject.call

        expect(CareerNeed.exists?(career_need.id)).to eq(false)
      end
    end

    context "when more than one career need is added" do
      let(:titles) { ["Internships", "Finding a co-founder"] }

      it "enqueues the job to update the career needs update activity" do
        Sidekiq::Testing.inline! do
          subject.call

          job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

          aggregate_failures do
            expect(job["arguments"][0]).to eq("career_needs_update")
            expect(job["arguments"][1]).to eq("@origin is open to internships and finding a co-founder.")
            expect(job["arguments"][2]).to eq(user.id)
          end
        end
      end
    end

    context "when all career needs are deleted" do
      let(:titles) { [] }
      let!(:career_need) do
        create :career_need, career_goal: career_goal, title: "Internships"
      end

      it "enqueues the job to update the career needs update activity" do
        Sidekiq::Testing.inline! do
          subject.call

          job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

          expect(job).to eq nil
        end
      end
    end
  end
end
