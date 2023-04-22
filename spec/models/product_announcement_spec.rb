require "rails_helper"

RSpec.describe ProductAnnouncement, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:user_product_announcements).dependent(:destroy) }
  end

  describe "validations" do
    describe "presence" do
      it "validates that there is content" do
        expect { create(:product_announcement, content: nil) }
          .to raise_error(ActiveRecord::RecordInvalid)
      end

      it "validates that there is a title" do
        expect { create(:product_announcement, title: nil) }
          .to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "read?" do
    let(:product_announcement) { create(:product_announcement) }
    let(:user) { create(:user) }

    context "when there is a user product announcement for the user" do
      let!(:user_product_announcement) do
        create(:user_product_announcement, product_announcement:, read_at:, user:)
      end

      context "when the user product announcement is read" do
        let(:read_at) { Time.current }

        it "returns true" do
          expect(product_announcement.read?(user)).to eq(true)
        end
      end

      context "when the user product announcement is unread" do
        let(:read_at) { nil }

        it "returns false" do
          expect(product_announcement.read?(user)).to eq(false)
        end
      end
    end

    context "when there is not a user product announcement for the user" do
      it "returns false" do
        expect(product_announcement.read?(user)).to eq(false)
      end
    end
  end
end
