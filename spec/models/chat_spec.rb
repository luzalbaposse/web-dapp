require "rails_helper"

RSpec.describe Chat, type: :model do
  subject { build :chat, receiver: build(:user), sender: build(:user) }

  describe "associations" do
    it { is_expected.to belong_to(:sender) }
    it { is_expected.to belong_to(:receiver) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:sender_id) }
    it { is_expected.to validate_presence_of(:receiver_id) }
    it { is_expected.to validate_presence_of(:last_message_at) }
    it { is_expected.to validate_uniqueness_of(:sender_id).scoped_to(:receiver_id) }
  end

  describe "#mark_as_read!" do
    let(:receiver) { create :user }
    let(:sender) { create :user }
    let!(:chat) { create :chat, receiver: receiver, sender: sender, sender_unread_messages_count: 5, receiver_unread_messages_count: 4 }

    context "when the conversation is marked as read for the sender" do
      it "updates the sender_unread_messages_count to 0" do
        expect { chat.mark_as_read!(sender) }.to change(chat, :sender_unread_messages_count).from(5).to(0)
      end
    end

    context "when the conversation is marked as read for the receiver" do
      it "updates the receiver_unread_messages_count to 0" do
        expect { chat.mark_as_read!(receiver) }.to change(chat, :receiver_unread_messages_count).from(4).to(0)
      end
    end
  end
end
