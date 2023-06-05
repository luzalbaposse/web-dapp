require "rails_helper"

RSpec.describe "Career goals", type: :request do
  let(:current_user) { create :user }
  let(:talent) { create :talent, user: current_user }

  describe "#update" do
    let!(:career_goal) { create :career_goal, talent: talent }
    subject(:update_career_goal_request) {
      patch api_v1_talent_career_goal_path(
        talent_id: talent.id,
        id: career_goal.id,
        params: params,
        as: current_user
      )
    }

    let(:params) do
      {
        career_goal: {
          pitch: "New pitch",
          bio: "New entry"
        },
        talent: {
          video: ""
        }
      }
    end

    context "when the current user does not match the user's career_goal passed" do
      let(:another_user) { create :user }

      it "returns an authorization error" do
        put api_v1_talent_career_goal_path(
          talent_id: talent.id,
          id: career_goal.id,
          params: params,
          as: another_user
        )

        expect(response).to have_http_status(:unauthorized)
      end

      it "renders the appropriate error message" do
        put api_v1_talent_career_goal_path(
          talent_id: talent.id,
          id: career_goal.id,
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
        update_career_goal_request

        expect(response).to have_http_status(:ok)
      end

      it "updates the career_goal" do
        update_career_goal_request

        career_goal.reload

        aggregate_failures do
          expect(career_goal.pitch).to eq "New pitch"
          expect(career_goal.bio).to eq "New entry"
        end
      end
    end
  end
end
