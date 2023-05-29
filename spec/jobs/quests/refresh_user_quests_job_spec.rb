require "rails_helper"

RSpec.describe Quests::RefreshUserQuestsJob, type: :job do
  let(:user) { create :user }
  let(:notify) { true }

  subject(:refresh_user_quests) { Quests::RefreshUserQuestsJob.perform_now(user.id, notify) }

  let(:refresh_user_quests_class) { Quests::RefreshUserQuests }
  let(:refresh_user_quests_service) { instance_double(refresh_user_quests_class, call: true) }

  before do
    allow(refresh_user_quests_class).to receive(:new).and_return(refresh_user_quests_service)
  end

  it "initializes and calls the refresh user quests service with the correct arguments" do
    refresh_user_quests

    aggregate_failures do
      expect(refresh_user_quests_class).to have_received(:new).with(
        user: user,
        notify: notify
      )
      expect(refresh_user_quests_service).to have_received(:call)
    end
  end
end
