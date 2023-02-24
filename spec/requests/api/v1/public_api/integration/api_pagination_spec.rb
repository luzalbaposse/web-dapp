require "rails_helper"

RSpec.describe "API pagination" do
  subject(:api_request) { get(api_v1_public_followers_path(id: id, params: params), headers: headers) }
  let!(:api_key) { create :api_key, :activated, access_key: access_key }
  let(:access_key) { SecureRandom.hex }

  let!(:user) { create :user }
  let(:id) { user.username }

  let!(:user_1) { create :user, created_at: Time.current - 5.days }
  let!(:user_2) { create :user, created_at: Time.current - 4.days }
  let!(:user_3) { create :user, created_at: Time.current - 3.days }
  let!(:user_4) { create :user, created_at: Time.current - 2.days }

  let(:params) { {} }
  let(:headers) do
    {
      "X-API-KEY": access_key
    }
  end

  before do
    create :follow, user: user, follower: user_1
    create :follow, user: user, follower: user_2
    create :follow, user: user, follower: user_3
    create :follow, user: user, follower: user_4

    # Sets the number of returned items per page
    ENV["API_PAGINATION_PER_PAGE"] = "2"
  end

  it "returns the correct pagination" do
    api_request

    aggregate_failures do
      expect(json[:followers].count).to eq 2
      expect(json[:followers].pluck(:username)).to eq([user_4.username, user_3.username])
      expect(json[:pagination]).to eq(
        {
          total: 4,
          cursor: user_3.uuid
        }
      )
    end
  end

  context "when the cursor is passed" do
    let(:params) { {cursor: user_3.uuid} }

    it "returns the correct pagination" do
      api_request

      aggregate_failures do
        expect(json[:followers].count).to eq 2
        expect(json[:followers].pluck(:username)).to eq([user_2.username, user_1.username])
        expect(json[:pagination]).to eq(
          {
            total: 4,
            cursor: nil
          }
        )
      end
    end
  end
end
