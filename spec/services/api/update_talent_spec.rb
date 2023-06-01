require "rails_helper"

RSpec.describe API::UpdateTalent do
  include ActiveJob::TestHelper

  let(:talent) { create :talent, :full_profile, :with_career_goal, public: false }
  let(:user) { create :user, talent: talent, invited: invite }
  let(:invite) { create :invite }
  let(:quest) { create :quest, user: user }

  subject(:update_talent) { described_class.new(user.talent, user) }

  let(:user_params) { {} }
  let(:talent_params) { {} }
  let(:tag_params) { {} }
  let(:career_needs_params) { {} }

  it "enqueues a job to refresh user quests" do
    Sidekiq::Testing.inline! do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      job = enqueued_jobs.find { |j| j["job_class"] == "Quests::RefreshUserQuestsJob" }

      aggregate_failures do
        expect(job["arguments"][0]).to eq(user.id)
      end
    end
  end

  context "when the user was invited" do
    it "enqueues a job to refresh user quests" do
      Sidekiq::Testing.inline! do
        update_talent.call(talent_params, user_params, tag_params, career_needs_params)

        job = enqueued_jobs.find { |j| j["job_class"] == "ExperiencePoints::CreditInvitePointsJob" }

        aggregate_failures do
          expect(job["arguments"][0]).to eq(invite.id)
        end
      end
    end
  end

  context "when the user was invited" do
    let(:invite) { nil }

    it "does not enqueue a job to refresh user quests" do
      Sidekiq::Testing.inline! do
        update_talent.call(talent_params, user_params, tag_params, career_needs_params)

        job = enqueued_jobs.find { |j| j["job_class"] == "ExperiencePoints::CreditInvitePointsJob" }

        aggregate_failures do
          expect(job).to be_nil
        end
      end
    end
  end

  context "when the user is approved" do
    let(:user_params) { {profile_type: "approved"} }
    let(:talent_params) { {} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {} }

    it "the talent becomes public" do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      expect(user.talent.public).to eq true
    end
  end

  context "when the user profile was set to public" do
    let(:user_params) { {} }
    let(:talent_params) { {public: true} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {} }

    it "the talent becomes public" do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      expect(user.talent.public).to eq true
    end

    it "enqueues a job to send add the user to mailerlite" do
      expect { update_talent.call(talent_params, user_params, tag_params, career_needs_params) }.to have_enqueued_job(AddUsersToMailerliteJob)
    end
  end

  context "when the user legal names are passed" do
    let(:user_params) { {legal_first_name: "Talent", legal_last_name: "Test"} }
    let(:talent_params) { {} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {} }

    it "updates the user legal names" do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      expect(user.legal_first_name).to eq "Talent"
      expect(user.legal_last_name).to eq "Test"
    end
  end

  context "when a new profile picture data is passed" do
    let(:user_params) { {} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {} }
    let(:talent_params) do
      {
        profile_picture_data: {
          id: "b7d3e25bd98cf67b7eb485f62679bc39.jpeg",
          storage: "cache",
          new_upload: new_upload,
          metadata: {
            size: 22078,
            filename: "5319238.jpeg",
            mime_type: "image/jpeg"
          }
        }
      }
    end

    before do
      allow(talent).to receive(:profile_picture=)
    end

    context "when it is a new upload" do
      let(:new_upload) { true }

      it "updates the profile picture data" do
        update_talent.call(talent_params, user_params, tag_params, career_needs_params)

        expect(talent).to have_received(:profile_picture=).with(
          {
            id: "b7d3e25bd98cf67b7eb485f62679bc39.jpeg",
            storage: "cache",
            metadata: {
              size: 22078,
              filename: "5319238.jpeg",
              mime_type: "image/jpeg"
            }
          }.as_json
        )
      end
    end

    context "when it is not a new upload" do
      let(:new_upload) { false }

      it "does not update the profile picture data" do
        update_talent.call(talent_params, user_params, tag_params, career_needs_params)

        expect(talent).not_to have_received(:profile_picture=)
      end
    end
  end

  context "when there are career need params" do
    let(:talent_params) { {} }
    let(:user_params) { {} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {career_needs: ["Full-time roles"]} }

    let(:career_needs_upsert_class) { CareerNeeds::Upsert }
    let(:career_needs_upsert) { instance_double(career_needs_upsert_class, call: true) }

    before do
      allow(career_needs_upsert_class).to receive(:new).and_return(career_needs_upsert)
    end

    it "initialises and calls the career needs upsert class with the correct arguments" do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      aggregate_failures do
        expect(career_needs_upsert_class)
          .to have_received(:new)
          .with(career_goal: talent.career_goal, titles: career_needs_params[:career_needs])

        expect(career_needs_upsert).to have_received(:call)
      end
    end
  end

  context "when there are profile params" do
    let(:talent_params) do
      {
        profile: {
          lens: "lens.xyz",
          mastodon: "mastodon.xyz"
        }
      }
    end
    let(:user_params) { {} }
    let(:tag_params) { {} }
    let(:career_needs_params) { {} }

    it "updates the talent profile fields" do
      update_talent.call(talent_params, user_params, tag_params, career_needs_params)

      expect(talent.mastodon).to eq "https://mastodon.xyz"
      expect(talent.lens).to eq "https://lens.xyz"
    end
  end
end
