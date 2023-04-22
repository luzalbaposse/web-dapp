require "rails_helper"

RSpec.describe "Product Announcements" do
  let!(:user) { create :user }

  describe "#latest_unread" do
    subject(:api_request) { get latest_unread_api_v1_public_product_announcements_path(as: user), headers: {} }

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"
    end

    context "when there are product announcements" do
      let!(:product_announcement_one) { create :product_announcement, created_at: Date.yesterday, title: "ONE" }
      let!(:product_announcement_two) { create :product_announcement, created_at: Time.current, title: "TWO" }

      it "returns a successful response with the latest unread product announcement" do
        api_request

        expect(response).to have_http_status(:ok)

        expect(json[:product_announcement][:content]).to eq(product_announcement_two.content)
        expect(json[:product_announcement][:image]).to eq(product_announcement_two.image)
        expect(json[:product_announcement][:link]).to eq(product_announcement_two.link)
        expect(json[:product_announcement][:title]).to eq(product_announcement_two.title)
      end

      context "when the current user has read the latest product announcement" do
        before do
          create :user_product_announcement,
            product_announcement: product_announcement_two,
            read_at: Time.current,
            user:
        end

        it "returns a successful response with no latest unread product announcement" do
          api_request

          expect(response).to have_http_status(:ok)
          expect(json[:product_announcement]).to be_nil
        end
      end
    end

    context "when there are no product announcements" do
      it "returns a successful response with no latest unread product announcement" do
        api_request

        expect(response).to have_http_status(:ok)
        expect(json[:product_announcement]).to be_nil
      end
    end
  end
end
