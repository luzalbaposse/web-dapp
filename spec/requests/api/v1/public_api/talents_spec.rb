require "swagger_helper"
require "rails_helper"

RSpec.describe "Talents API" do
  let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
  let(:access_key) { SecureRandom.hex }
  let(:"X-API-KEY") { access_key }

  path "/talents" do
    get "Retrieves a list of talents" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: "ids[]", in: :query, schema: {type: :array, items: {type: "string"}}, description: "List of wallet addresses or usernames"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:"ids[]") { nil }

      let!(:user_1) { create :user, :with_talent_token }
      let!(:user_2) { create :user, :with_talent_token }
      let!(:user_3) { create :user, :with_talent_token }
      let!(:user_4) { create :user, :with_talent_token }

      response "200", "get all talents", save_example: true do
        schema type: :object,
          properties: {
            talents: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talents = data["talents"]
          returned_usernames = returned_talents.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["talents"].count).to eq 4
            expect(returned_usernames).to match_array([user_1.username, user_2.username, user_3.username, user_4.username])

            expect(returned_pagination["total"]).to eq 4
          end
        end
      end

      response "200", "get all talents with filter", document: false do
        let(:"ids[]") { [user_1.username, user_2.username] }

        schema type: :object,
          properties: {
            talents: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::DETAILED_TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talents = data["talents"]
          returned_usernames = returned_talents.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["talents"].count).to eq 2
            expect(returned_usernames).to match_array([user_1.username, user_2.username])

            expect(returned_pagination["total"]).to eq 2
          end
        end
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/{id}" do
    get "Retrieves a talent" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Wallet address or username"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      before do
        user_1 = create :user
        user_2 = create :user, :with_talent_token

        create :subscription, user: user_1, subscriber: talent_user
        create :subscription, user: user_2, subscriber: talent_user
        create :subscription, user: talent_user, subscriber: user_1

        create :talent_supporter, supporter_wallet_id: talent_user.wallet_id, talent_contract_id: user_2.talent.talent_token.contract_id, amount: "2000000"
        create :talent_supporter, supporter_wallet_id: user_1.wallet_id, talent_contract_id: talent_user.talent.talent_token.contract_id, amount: "1000000"
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            talent: {
              type: :object,
              properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talent = data["talent"]
          aggregate_failures do
            expect(returned_talent["username"]).to eq(talent_user.username)
            expect(returned_talent["name"]).to eq(talent_user.name)
            expect(returned_talent["email"]).to eq(talent_user.email)
            expect(returned_talent["headline"]).to eq(talent_user.talent.headline)
            expect(returned_talent["wallet_address"]).to eq(talent_user.wallet_id)
            expect(returned_talent["profile_picture_url"]).to eq(talent_user.profile_picture_url)
            expect(returned_talent["subscribers_count"]).to eq(1)
            expect(returned_talent["subscribing_count"]).to eq(2)
            expect(returned_talent["supporters_count"]).to eq(1)
            expect(returned_talent["supporting_count"]).to eq(1)
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/recommended" do
    get "Retrieves a list of recommended talents" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let!(:top_100_talent_discovery_row) { create :discovery_row, slug: "top-100-talent", title: "Top 100 Talent" }
      let!(:top_100_talent_tag) do
        create :tag, description: "top-100-talent", hidden: true, discovery_row: top_100_talent_discovery_row
      end

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let!(:user_1) { create :user, :with_talent_token }
      let!(:user_2) { create :user, :with_talent_token }
      let!(:user_3) { create :user, :with_talent_token }
      let!(:user_4) { create :user, :with_talent_token }

      before do
        talent_user.tags << top_100_talent_tag
        user_1.tags << top_100_talent_tag
        user_2.tags << top_100_talent_tag
        user_3.tags << top_100_talent_tag
        user_4.tags << top_100_talent_tag

        talent_user.save!
        user_1.save!
        user_2.save!
        user_3.save!
        user_4.save!
      end

      response "200", "get all recommended talents", save_example: true do
        schema type: :object,
          properties: {
            talents: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)
          puts response.body
          returned_talents = data["talents"]
          returned_usernames = returned_talents.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["talents"].count).to eq 4
            expect(returned_usernames).to match_array([user_1.username, user_2.username, user_3.username, user_4.username])

            expect(returned_pagination["total"]).to eq 4
          end
        end
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/about" do
    get "Retrieves a talent" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let!(:user) { create(:user, wallet_id: wallet_id, display_name: "API user") }
      let!(:talent) { create :talent, user: user }
      let!(:milestone1) { create :milestone, talent: talent, title: "milestone1" }
      let!(:milestone2) { create :milestone, talent: talent, title: "milestone2" }
      let(:career_goal) { create(:career_goal, talent: talent) }
      let!(:goal1) { create(:goal, career_goal: career_goal, title: "goal1", due_date: Time.zone.today) }
      let!(:goal2) { create(:goal, career_goal: career_goal, title: "goal2", due_date: Time.zone.today) }
      let!(:career_need1) { create(:career_need, career_goal: career_goal, title: "career_need1") }
      let!(:career_need2) { create(:career_need, career_goal: career_goal, title: "career_need2") }

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            talent: {
              type: :object,
              properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talent = data["talent"]
          returned_milestones = returned_talent["milestones"].map { |m| m["title"] }
          returned_career_goal = data["talent"]["career_goal"]
          returned_goals = returned_career_goal["goals"].map { |c| c["title"] }
          returned_career_needs = returned_career_goal["career_needs"].map { |c| c["title"] }
          aggregate_failures do
            expect(returned_milestones).to match_array([milestone1.title, milestone2.title])
            expect(returned_goals).to match_array([goal1.title, goal2.title])
            expect(returned_career_needs).to match_array([career_need1.title, career_need2.title])
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/support" do
    get "Retrieves a talent" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let!(:user) { create(:user, wallet_id: wallet_id, display_name: "API user") }
      let!(:talent) do
        create :talent,
          user: user,
          total_supply: "2",
          supporters_count: 3,
          market_cap: "1000",
          market_cap_variance: "2.0"
      end
      let!(:talent_token) { create(:talent_token, talent: talent, contract_id: "CONTRACT_ID") }

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            talent: {
              type: :object,
              properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talent = data["talent"]
          returned_talent_token = returned_talent["talent_token"]
          aggregate_failures do
            expect(returned_talent["total_supply"]).to eq(talent.total_supply)
            expect(returned_talent["supporters_count"]).to eq(talent.supporters_count)
            expect(returned_talent["market_cap"]).to eq(talent.market_cap)
            expect(returned_talent_token["contract_id"]).to eq(talent_token.contract_id)
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/overview" do
    get "Retrieves a talent" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let!(:current_user) { create(:user, display_name: "API user") }
      let!(:user) { create(:user, wallet_id: wallet_id) }
      let!(:talent) { create :talent, user: user }

      before do
        stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
        host! "app.talentprotocol.com"
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
        create :subscription, accepted_at: DateTime.now, subscriber: current_user, user: user
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            talent: {
              type: :object,
              properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talent = data["talent"]
          aggregate_failures do
            expect(returned_talent["username"]).to eq(user.username)
            expect(returned_talent["name"]).to eq(user.name)
            expect(returned_talent["email"]).to eq(user.email)
            expect(returned_talent["headline"]).to eq(user.talent.headline)
            expect(returned_talent["wallet_address"]).to eq(user.wallet_id)
            expect(returned_talent["profile_picture_url"]).to eq(user.profile_picture_url)
            expect(returned_talent["subscribing_status"]).to eq("subscribed")
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/talents/following" do
    get "Retrieves a talent following" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let!(:current_user) { create(:user, display_name: "API user") }
      let!(:user) { create(:user, wallet_id: wallet_id) }
      let!(:talent) { create :talent, user: user }

      let!(:user2) { create(:user) }
      let!(:user3) { create(:user) }
      let!(:user4) { create(:user) }
      let!(:user5) { create(:user) }

      before do
        stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
        host! "app.talentprotocol.com"
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
        create :connection, user: current_user, connected_user: user, connection_types: ["subscribing"]
        create :connection, user: current_user, connected_user: user2, connection_types: ["staking", "subscriber"]
        create :connection, user: current_user, connected_user: user3, connection_types: ["sponsoring"]
        create :connection, user: current_user, connected_user: user4, connection_types: ["subscribing", "sponsoring"]
        create :connection, user: current_user, connected_user: user5, connection_types: ["subscriber"]
        create :connection, user: user, connected_user: user3, connection_types: ["subscriber", "staker"]
        create :connection, user: user, connected_user: user4, connection_types: ["subscriber"]
        create :connection, user: user, connected_user: user5, connection_types: ["subscriber"]
      end

      response "200", "intersection between users you're following and user's followers", save_example: true do
        schema type: :object,
          properties: {
            talents: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)
          puts response.body
          returned_talents = data["talents"]
          returned_usernames = returned_talents.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["talents"].count).to eq 2
            expect(returned_usernames).to match_array([user3.username, user4.username])

            expect(returned_pagination["total"]).to eq 2
          end
        end
      end

      response "200", "users you're following", save_example: true do
        let!(:id) { nil }

        schema type: :object,
          properties: {
            talents: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)
          puts response.body
          returned_talents = data["talents"]
          returned_usernames = returned_talents.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["talents"].count).to eq 4
            expect(returned_usernames).to match_array([user.username, user2.username, user3.username, user4.username])

            expect(returned_pagination["total"]).to eq 4
          end
        end
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
