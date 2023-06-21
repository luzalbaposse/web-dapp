require "rails_helper"

RSpec.shared_examples "a job that sends the opportunity email" do
  it "sends the opportunity email" do
    Sidekiq::Testing.inline! do
      subject.perform_now

      perform_enqueued_jobs

      expect(ActionMailer::Base.deliveries.map(&:subject)).to include(email_subject)
    end
  end
end

RSpec.shared_examples "a job that creates a user email log and persists sent at data" do
  it "creates a user email log and persists the sent at time" do
    freeze_time do
      expect { subject.perform_now }.to change { UserEmailLog.count }.by(1)

      user_email_log = UserEmailLog.last

      aggregate_failures do
        expect(user_email_log.sent_at_data).to eq({email_name => Time.current.utc.iso8601(3)})
        expect(user_email_log.user).to eq(user)
      end
    end
  end
end

RSpec.shared_examples "a job that does not send the opportunity email" do
  it "does not send the opportunity email" do
    Sidekiq::Testing.inline! do
      subject.perform_now

      perform_enqueued_jobs

      expect(ActionMailer::Base.deliveries.map(&:subject)).not_to include(email_subject)
    end
  end
end

RSpec.describe SendCareerNeedOpportunityEmailsJob, type: :job do
  include ActiveJob::TestHelper

  let!(:user) { create :user, talent: talent }
  let(:talent) { create :talent, :with_career_goal }

  let(:hiring_career_need) { CareerNeed::HIRING_NEEDS.sample }
  let(:role_career_need) { CareerNeed::ROLE_NEEDS.sample }

  let(:deliveries) { ActionMailer::Base.deliveries }

  subject(:subject) { described_class }

  describe "#perform" do
    describe "opportunities_open_roles" do
      let(:email_name) { "opportunities_open_roles" }
      let(:email_subject) { "We have open roles for you!" }

      context "when the user has a role career need" do
        before do
          create :career_need, career_goal: talent.career_goal, title: role_career_need
        end

        context "when the user has a user email log" do
          let!(:user_email_log) { create :user_email_log, sent_at_data: sent_at_data, user: user }

          context "when an opportunities open roles email has been sent within three months" do
            let(:sent_at_data) { {email_name => Time.current - 1.months} }

            it_behaves_like "a job that does not send the opportunity email"
          end

          context "when an opportunities open roles email has been sent more than three months ago" do
            let(:sent_at_data) { {email_name => Time.current - 3.months - 1.day} }

            it_behaves_like "a job that sends the opportunity email"
          end
        end

        context "when the user does not have a user email log" do
          it_behaves_like "a job that sends the opportunity email"
          it_behaves_like "a job that creates a user email log and persists sent at data"
        end
      end

      context "when the user does not have any role career needs" do
        it_behaves_like "a job that does not send the opportunity email"
      end
    end
  end
end
