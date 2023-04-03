require "rails_helper"

RSpec.describe "Career circles", type: :request do
  describe "#show" do
    subject(:get_career_circle) { get career_circle_path(as: current_user) }

    let(:current_user) { create :user }

    it "returns a successful response" do
      get_career_circle

      expect(response).to have_http_status(:ok)
    end
  end
end
