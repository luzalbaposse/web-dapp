require "rails_helper"

RSpec.describe "Talent", type: :request do
  let(:current_user) { create :user }

  describe "#show" do
    subject(:get_talent) { get talent_index_path(as: current_user) }

    it "returns a successful response" do
      get_talent

      expect(response).to have_http_status(:ok)
    end
  end
end
