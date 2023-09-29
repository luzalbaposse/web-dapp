require "swagger_helper"
require "rails_helper"

RSpec.describe "Goals API" do
  before do
    stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
    host! "app.talentprotocol.com"
  end

  let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
  let(:access_key) { SecureRandom.hex }
  let(:"X-API-KEY") { access_key }

  path "/goals" do
    get "Retrieves a list of goals" do
      tags "Goals"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:id) { nil }

      let(:user) { create :user }
      let!(:talent) { create :talent, user: user }
      let!(:goal1) { create(:goal, user: user, title: "goal1", due_date: Time.zone.today) }
      let!(:goal2) { create(:goal, user: user, title: "goal2", due_date: Time.zone.today) }
      let!(:election) { create(:election, start_date: Time.current - 1.day) }

      response "200", "get all user goals", document: false do
        let(:id) { user.username }

        schema type: :object,
          properties: {
            goals: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::GOAL_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_goals = data["goals"]
          returned_titles = returned_goals.map { |f| f["title"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_goals.count).to eq 2
            expect(returned_titles).to match_array([goal1.title, goal2.title])

            expect(returned_pagination["total"]).to eq 2
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

    post "Creates a goal for the talent" do
      tags "Goals"
      consumes "application/json"
      produces "application/json"
      parameter name: :goal, in: :body, schema: {
        type: :object,
        properties: {
          goal: {
            type: :object,
            properties: {
              title: {type: :string, description: "The title of the goal"},
              progress: {type: :string, description: "The title of the goal"},
              description: {type: :string, description: "The description of the goal"},
              due_date: {type: :string, format: :datetime, description: "The timestamp of the goal due date"}
            }
          }
        }
      }
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:current_user) { create(:user, :with_talent_token, display_name: "API user") }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
      end

      let(:title) { "Goal title" }
      let(:progress) { "doing" }
      let(:description) { "Goal description" }
      let(:due_date) { "01-05-2023" }

      let(:goal) do
        {
          goal: {
            title: title,
            progress: progress,
            description: description,
            due_date: due_date
          }
        }
      end

      response "201", "talent found", document: false do
        schema type: :object,
          properties: {
            goal: {
              type: :object,
              properties: PublicAPI::ObjectProperties::GOAL_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_goal = data["goal"]
          aggregate_failures do
            expect(returned_goal["title"]).to eq title
            expect(returned_goal["description"]).to eq description
            expect(returned_goal["progress"]).to eq progress
          end
        end
      end

      response "400", "title not present", document: false do
        let(:title) { nil }
        run_test!
      end

      response "401", "unauthorized request", document: false do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end

  path "/goals/{id}" do
    patch "Updates a goal of the talent" do
      tags "Goals"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Goal uuid"
      parameter name: :goal, in: :body, schema: {
        type: :object,
        properties: {
          goal: {
            type: :object,
            properties: {
              title: {type: :string, description: "The title of the goal"},
              progress: {type: :string, description: "The title of the goal"},
              description: {type: :string, description: "The description of the goal"},
              due_date: {type: :string, format: :datetime, description: "The timestamp of the goal due date"}
            }
          }
        }
      }
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, display_name: "API user") }
      let!(:update_goal) { create :goal, user: talent_user }
      let(:id) { update_goal.uuid }

      let(:current_user) { talent_user }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
      end

      let(:title) { "Goal title" }
      let(:progress) { "doing" }
      let(:description) { "Goal description" }
      let(:due_date) { "01-05-2023" }

      let(:goal) do
        {
          goal: {
            title: title,
            progress: progress,
            description: description,
            due_date: due_date
          }
        }
      end

      response "200", "goal found", document: false do
        schema type: :object,
          properties: {
            goal: {
              type: :object,
              properties: PublicAPI::ObjectProperties::GOAL_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_goal = data["goal"]
          aggregate_failures do
            expect(returned_goal["title"]).to eq title
            expect(returned_goal["description"]).to eq description
            expect(returned_goal["progress"]).to eq progress
          end
        end
      end

      response "400", "title not present", document: false do
        let(:title) { nil }
        run_test!
      end

      response "401", "unauthorized request", document: false do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end

    delete "Deletes a goal of the talent" do
      tags "Goals"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Goal uuid"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, display_name: "API user") }
      let!(:deleted_goal) { create :goal, user: talent_user }
      let(:id) { deleted_goal.uuid }

      let(:current_user) { talent_user }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
      end

      response "200", "goal found", document: false do
        schema type: :object,
          properties: {
            goal: {
              type: :object,
              properties: PublicAPI::ObjectProperties::GOAL_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_goal = data["goal"]
          aggregate_failures do
            expect(Goal.count).to eq 0
            expect(returned_goal["title"]).to eq deleted_goal.title
            expect(returned_goal["description"]).to eq deleted_goal.description
            expect(returned_goal["progress"]).to eq deleted_goal.progress
          end
        end
      end

      response "404", "Goal not found", document: false do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request", document: false do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
