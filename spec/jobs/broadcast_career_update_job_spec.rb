require "rails_helper"

RSpec.describe BroadcastCareerUpdateJob, type: :job do
  let(:career_update) { create :career_update, user: sender, text: message }
  let(:sender) { create :user, :with_talent_token }
  let(:talent_token) { sender.talent.talent_token }
  let(:message) { "Career update!" }

  subject(:broadcast_update) { BroadcastCareerUpdateJob.perform_now(career_update_id: career_update.id) }

  let(:create_notification_class) { CreateNotification }
  let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

  let(:send_message_class) { Messages::Send }
  let(:send_message_instance) { instance_double(send_message_class, call: true) }

  let(:refresh_user_quests_class) { Quests::RefreshUserQuests }
  let(:refresh_user_quests_instance) { instance_double(refresh_user_quests_class, call: true) }

  let(:investor_user_one) { create :user }
  let(:investor_user_two) { create :user }

  let(:subscriber_one) { create :user }
  let(:subscriber_two) { create :user }

  before do
    create :talent_supporter, supporter_wallet_id: investor_user_one.wallet_id, talent_contract_id: talent_token.contract_id
    create :talent_supporter, supporter_wallet_id: investor_user_two.wallet_id, talent_contract_id: talent_token.contract_id

    create :subscription, user: sender, subscriber: subscriber_one
    create :subscription, user: sender, subscriber: subscriber_two

    allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
    allow(send_message_class).to receive(:new).and_return(send_message_instance)
    allow(refresh_user_quests_class).to receive(:new).and_return(refresh_user_quests_instance)
  end

  it "initializes and calls the refresh user quests" do
    broadcast_update

    expect(refresh_user_quests_class).to have_received(:new).with(
      user: sender
    )
    expect(refresh_user_quests_instance).to have_received(:call)
  end

  it "initializes and calls the send message to all supporters" do
    broadcast_update

    expect(send_message_class).to have_received(:new)
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: investor_user_one,
      career_update: career_update,
      create_notification: false
    )
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: investor_user_two,
      career_update: career_update,
      create_notification: false
    )
  end

  it "initializes and calls the create notification to all supporters" do
    broadcast_update

    expect(create_notification_class).to have_received(:new)

    expect(create_notification_instance).to have_received(:call).with(
      extra_params: {career_update_id: career_update.id},
      recipient: investor_user_one,
      source_id: sender.id,
      type: CareerUpdateCreatedNotification
    )

    expect(create_notification_instance).to have_received(:call).with(
      extra_params: {career_update_id: career_update.id},
      recipient: investor_user_two,
      source_id: sender.id,
      type: CareerUpdateCreatedNotification
    )
  end

  it "initializes and calls the create notification to all subscribers" do
    broadcast_update

    expect(create_notification_class).to have_received(:new)
    expect(create_notification_instance).to have_received(:call).with(
      extra_params: {career_update_id: career_update.id},
      recipient: subscriber_one,
      source_id: sender.id,
      type: CareerUpdateCreatedNotification
    )
    expect(create_notification_instance).to have_received(:call).with(
      extra_params: {career_update_id: career_update.id},
      recipient: subscriber_two,
      source_id: sender.id,
      type: CareerUpdateCreatedNotification
    )
  end

  it "initializes and calls the send message to all subscribers" do
    broadcast_update

    expect(send_message_class).to have_received(:new)
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: subscriber_one,
      career_update: career_update,
      create_notification: false
    )
    expect(send_message_instance).to have_received(:call).with(
      message: message,
      sender: sender,
      receiver: subscriber_two,
      career_update: career_update,
      create_notification: false
    )
  end

  it "adds a new activity to the global feed" do
    broadcast_update

    expect(subscriber_one.activity_feed.all_activities.count).to eq 1
    expect(subscriber_two.activity_feed.all_activities.count).to eq 1
  end

  context "when the user has invested in himself" do
    before do
      create :talent_supporter, supporter_wallet_id: sender.wallet_id, talent_contract_id: talent_token.contract_id
    end

    it "does not create a notification for themselves" do
      broadcast_update

      expect(create_notification_instance).not_to have_received(:call).with(
        extra_params: {career_update_id: career_update.id},
        recipient: sender,
        source_id: sender.id,
        type: CareerUpdateCreatedNotification
      )
    end

    it "does not send a message to themselves" do
      broadcast_update

      expect(send_message_instance).not_to have_received(:call).with(
        message: message,
        sender: sender,
        receiver: sender,
        career_update: career_update,
        create_notification: false
      )
    end
  end

  context "when a user has invested and subscribed the sender user" do
    before do
      create :subscription, user: sender, subscriber: investor_user_one
    end

    it "does not create a notification twice for the same user" do
      broadcast_update

      expect(create_notification_instance).to have_received(:call).with(
        extra_params: {career_update_id: career_update.id},
        recipient: investor_user_one,
        source_id: sender.id,
        type: CareerUpdateCreatedNotification
      ).once
    end

    it "does not send a message twice to the same user" do
      broadcast_update

      expect(send_message_instance).to have_received(:call).with(
        message: message,
        sender: sender,
        receiver: investor_user_one,
        career_update: career_update,
        create_notification: false
      ).once
    end
  end
end
