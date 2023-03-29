require "rails_helper"

RSpec.describe "Perks", type: :request do
  let(:current_user) { create :user }
  let(:talent) { create :talent, user: current_user }

  describe "#update" do
    subject(:update_perk_request) {
      patch api_v1_talent_perk_path(
        talent_id: talent.id,
        id: perk.id,
        params: params,
        as: current_user
      )
    }

    let!(:perk) { create :perk, talent: talent }

    let(:params) do
      {
        perk: {
          title: "New title",
          price: 10000
        }
      }
    end

    context "when the current user does not match the user's perk passed" do
      let(:another_user) { create :user }

      it "returns an authorization error" do
        put api_v1_talent_perk_path(
          talent_id: talent.id,
          id: perk.id,
          params: params,
          as: another_user
        )

        expect(response).to have_http_status(:unauthorized)
      end

      it "renders the appropriate error message" do
        put api_v1_talent_perk_path(
          talent_id: talent.id,
          id: perk.id,
          params: params,
          as: another_user
        )

        expect(json).to eq(
          {
            error: "You don't have access to perform that action"
          }
        )
      end
    end

    context "when the params are all valid" do
      it "returns a successful response" do
        update_perk_request

        expect(response).to have_http_status(:ok)
      end

      it "updates the perk" do
        update_perk_request

        perk.reload

        aggregate_failures do
          expect(perk.title).to eq "New title"
          expect(perk.price).to eq 10000
        end
      end
    end
  end

  describe "#create" do
    subject(:create_perk_request) {
      post api_v1_talent_perks_path(
        talent_id: talent.id,
        params: params,
        as: current_user
      )
    }

    let(:params) do
      {
        perk: {
          title: "New title",
          price: 10000
        }
      }
    end

    context "when the current user does not match the user's perk passed" do
      let(:another_user) { create :user }

      it "returns an authorization error" do
        post api_v1_talent_perks_path(
          talent_id: talent.id,
          params: params,
          as: another_user
        )

        expect(response).to have_http_status(:unauthorized)
      end

      it "renders the appropriate error message" do
        post api_v1_talent_perks_path(
          talent_id: talent.id,
          params: params,
          as: another_user
        )

        expect(json).to eq(
          {
            error: "You don't have access to perform that action"
          }
        )
      end
    end

    context "when the params are all valid" do
      it "returns a successful response" do
        create_perk_request

        expect(response).to have_http_status(:created)
      end

      it "creates the perk" do
        expect { create_perk_request }.to change(Perk, :count).from(0).to(1)

        aggregate_failures do
          expect(json[:title]).to eq "New title"
          expect(json[:price]).to eq 10000
        end
      end
    end
  end

  describe "#destroy" do
    let(:destroy_perk_request) {
      delete api_v1_talent_perk_path(
        talent_id: talent.id,
        id: perk.id,
        as: current_user
      )
    }

    let!(:perk) { create :perk, talent: talent }

    context "when the current user does not match the user's perk passed" do
      let(:another_user) { create :user }

      it "returns an authorization error" do
        delete api_v1_talent_perk_path(
          talent_id: talent.id,
          id: perk.id,
          as: another_user
        )

        expect(response).to have_http_status(:unauthorized)
      end

      it "renders the appropriate error message" do
        delete api_v1_talent_perk_path(
          talent_id: talent.id,
          id: perk.id,
          as: another_user
        )

        expect(json).to eq(
          {
            error: "You don't have access to perform that action"
          }
        )
      end
    end

    context "when the params are all valid" do
      it "returns a successful response" do
        destroy_perk_request

        expect(response).to have_http_status(:ok)
      end

      it "deletes the perk" do
        expect { destroy_perk_request }.to change(Perk, :count).from(1).to(0)
      end
    end
  end
end
