require "rails_helper"

RSpec.describe ProductAnnouncement, type: :model do
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
end
