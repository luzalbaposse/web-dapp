require "rails_helper"

RSpec.describe BroadcastCareerUpdateJob, type: :job do
  let(:career_update) { create :career_update, user: sender, text: message }
  let(:sender) { create :user, :with_talent_token }
  let(:talent_token) { sender.talent.talent_token }
  let(:message) { "Career update!" }

  subject(:broadcast_update) { BroadcastCareerUpdateJob.perform_now(career_update_id: career_update.id) }

  let(:send_message_class) { Messages::Send }
  let(:send_message_instance) { instance_double(send_message_class, call: true) }

  let(:investor_user_one) { create :user }
  let(:investor_user_two) { create :user }

  let(:subscriber_one) { create :user }
  let(:subscriber_two) { create :user }

  before do
    create :talent_supporter, supporter_wallet_id: investor_user_one.wallet_id, talent_contract_id: talent_token.contract_id
    create :talent_supporter, supporter_wallet_id: investor_user_two.wallet_id, talent_contract_id: talent_token.contract_id

    create :subscription, user: sender, subscriber: subscriber_one
    create :subscription, user: sender, subscriber: subscriber_two

    allow(send_message_class).to receive(:new).and_return(send_message_instance)
  end

  it "initializes and calls the send message to all supporters" do
    broadcast_update

    expect(send_message_class).to have_received(:new)
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: investor_user_one,
      career_update: career_update
    )
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: investor_user_two,
      career_update: career_update
    )
  end

  it "initializes and calls the send message to all subscribers" do
    broadcast_update

    expect(send_message_class).to have_received(:new)
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: subscriber_one,
      career_update: career_update
    )
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: subscriber_two,
      career_update: career_update
    )
  end

  context "when the user has invested in himself" do
    before do
      create :talent_supporter, supporter_wallet_id: sender.wallet_id, talent_contract_id: talent_token.contract_id
    end

    it "does not send a message to himself" do
      broadcast_update

      expect(send_message_instance).not_to have_received(:call).with(
        message: message,
        sender: sender,
        receiver: sender,
        career_update: career_update
      )
    end
  end

  context "when a user has invested and subscribed the sender user" do
    before do
      create :subscription, user: sender, subscriber: investor_user_one
    end

    it "does not send a message twice to the same user" do
      broadcast_update

      expect(send_message_instance).to have_received(:call).with(
        message: message,
        sender: sender,
        receiver: investor_user_one,
        career_update: career_update
      ).once
    end
  end
end
