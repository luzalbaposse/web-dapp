require "swagger_helper"
require "rails_helper"

RSpec.describe "Experience Rewards API" do
  path "/experience_rewards" do
    get "Retrieves the current rewards for experience that exists" do
      tags "Rewards"
      consumes "application/json"
      produces "application/json"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:experience_reward) { create :experience_rewards_small_tal, cost: 10, active: true, stock: 100 }
      let!(:experience_reward_1) { create :experience_rewards_small_tal, cost: 15, active: true, stock: 45 }

      let(:current_user) { create :user }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
      end

      response "200", "Lists all rewards", save_example: true do
        schema type: :object,
          properties: {
            rewards: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::EXPERIENCE_REWARD_PROPERTIES
              }
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_rewards = data["rewards"]
          returned_costs = returned_rewards.map { |f| f["cost"] }
          returned_stocks = returned_rewards.map { |f| f["stock"] }
          aggregate_failures do
            expect(returned_rewards.count).to eq 2
            expect(returned_costs).to eq([10, 15])
            expect(returned_stocks).to eq([100, 45])
          end
        end
      end

      response "200", "Lists only rewards that are active", save_example: true do
        schema type: :object,
          properties: {
            rewards: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::EXPERIENCE_REWARD_PROPERTIES
              }
            }
          }
        let!(:experience_reward) { create :experience_rewards_small_tal, cost: 10, active: false, stock: 100 }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_rewards = data["rewards"]
          returned_costs = returned_rewards.map { |f| f["cost"] }
          returned_stocks = returned_rewards.map { |f| f["stock"] }
          aggregate_failures do
            expect(returned_rewards.count).to eq 1
            expect(returned_costs).to eq([15])
            expect(returned_stocks).to eq([45])
          end
        end
      end
    end
  end

  path "/experience_rewards/{id}/claim" do
    post "Claims the reward if it's available" do
      tags "Rewards"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Reward uuid"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:experience_reward) { create :experience_rewards_small_tal, cost: 10, active: true, stock: 100 }
      let!(:experience_reward_1) { create :experience_rewards_small_tal, cost: 15, active: true, stock: 45 }
      let(:id) { "123" }

      let(:claim_rewards_class) { Rewards::Claim }
      let(:claim_rewards_instance) { instance_double(claim_rewards_class, call: true) }

      let(:current_user) { create :user }
      let!(:talent) { create :talent, user: current_user, verified: true }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(current_user)
      end

      response "404", "if no matching reward is found", save_example: true do
        schema type: :object,
          properties: {
            error: {
              type: :string,
              description: "The error that occurred"
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["error"]).to eq "Resource not found."
          end
        end
      end

      response "409", "if the reward is out of stock", save_example: true do
        schema type: :object,
          properties: {
            error: {
              type: :string,
              description: "The error that occurred"
            }
          }

        let!(:experience_reward_1) { create :experience_rewards_small_tal, cost: 15, active: true, stock: 0 }
        let(:id) { experience_reward_1.uuid }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["error"]).to eq "Reward is currently out of stock."
          end
        end
      end

      response "409", "if the user does not have enough points", save_example: true do
        schema type: :object,
          properties: {
            error: {
              type: :string,
              description: "The error that occurred"
            }
          }

        let(:id) { experience_reward_1.uuid }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["error"]).to eq "You don't have enough experience points."
          end
        end
      end

      response "200", "if the service is successful then we get a positive response", save_example: true do
        schema type: :object,
          properties: {
            error: {
              type: :string,
              description: "The error that occurred"
            }
          }

        let(:id) { experience_reward_1.uuid }

        before do
          allow(claim_rewards_class).to receive(:new).and_return(claim_rewards_instance)
        end

        run_test! do |response|
          aggregate_failures do
            expect(claim_rewards_class).to have_received(:new).with(
              user: current_user,
              reward: ExperienceRewards::SmallTal.find_by(uuid: id)
            )
            expect(claim_rewards_instance).to have_received(:call)
          end
        end
      end
    end
  end
end
