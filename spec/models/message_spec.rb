require "rails_helper"

RSpec.describe Message, type: :model do
  subject { build :message, receiver: build(:user), sender: build(:user) }

  describe "associations" do
    it { is_expected.to belong_to(:chat).optional }
    it { is_expected.to belong_to(:career_update).optional }
    it { is_expected.to belong_to(:sender) }
    it { is_expected.to belong_to(:receiver) }
  end

  describe "#to_json" do
    it "returns a json representation of a message" do
      expect(subject.to_json).to eq(
        {
          id: subject.id,
          sender_id: subject.sender.uuid,
          receiver_id: subject.receiver.uuid,
          created_at: subject.created_at,
          updated_at: subject.updated_at,
          text: subject.text,
          from_career_update: subject.career_update.present?
        }
      )
    end
  end
end
