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

  describe "#update" do
    let(:product_announcement) { create :product_announcement, uuid: "UUID" }

    subject(:api_request) do
      put api_v1_public_product_announcement_path(id: "UUID", as: user)
    end

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"

      allow(ProductAnnouncement).to receive(:find_by).and_return(product_announcement)
      allow(product_announcement).to receive(:mark_as_read_for!).and_call_original
    end

    it "calls #mark_as_read_for! on the product announcement with the user" do
      api_request

      expect(product_announcement).to have_received(:mark_as_read_for!).with(user)
    end

    it "returns a successful response" do
      api_request

      expect(response).to have_http_status(:ok)
    end
  end
end
