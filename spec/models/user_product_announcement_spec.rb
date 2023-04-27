require "rails_helper"

RSpec.describe UserProductAnnouncement, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:product_announcement) }
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    describe "uniqueness" do
      it "validates uniqueness between product announcement and user" do
        user_product_announcement = create(:user_product_announcement)

        expect {
          create(
            :user_product_announcement,
            product_announcement: user_product_announcement.product_announcement,
            user: user_product_announcement.user
          )
        }
          .to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
