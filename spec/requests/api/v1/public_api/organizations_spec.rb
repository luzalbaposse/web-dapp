require "rails_helper"
require "swagger_helper"

RSpec.describe "Organizations API", type: :request do
  let!(:api_key_object) { create :api_key, :activated, access_key: }
  let(:access_key) { SecureRandom.hex }
  let(:"X-API-KEY") { access_key }
  let(:user) { create :user }

  let!(:organization_1) { create :community, name: "Community 1" }
  let!(:organization_2) { create :community, name: "Community 2" }
  let!(:organization_3) { create :team, name: "Team 1" }
  let!(:organization_4) { create :team, name: "Team 2" }

  path "/organizations" do
    get "Retrieves a list of organizations" do
      tags "Organizations"
      consumes "application/json"
      produces "application/json"
      parameter name: :keyword, in: :query, schema: {type: :string}, description: "Filter by name"
      parameter name: :type, in: :query, schema: {type: :string, enum: %w[community team]}, description: "Filter by a specific type"
      parameter name: :user_id, in: :query, schema: {type: :string}, description: "Filter by a user"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:keyword) { nil }
      let(:type) { nil }
      let(:user_id) { nil }

      response "200", "get all organizations", save_example: true do
        schema type: :object,
          properties: {
            organizations: {
              type: :array,
              items: {
                properties: PublicAPI::ObjectProperties::ORGANIZATION_PROPERTIES,
                type: :object
              }
            },
            pagination: {
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES,
              type: :object
            }
          }

        before do
          stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
          host! "app.talentprotocol.com"
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["organizations"].count).to eq(4)

            expect(data["organizations"].map { |organization| organization["name"] })
              .to match_array(
                [
                  organization_1.name,
                  organization_2.name,
                  organization_3.name,
                  organization_4.name
                ]
              )
          end
        end
      end

      response "200", "get all organizations with a keyword filter", document: false do
        let(:keyword) { "Comm" }

        schema type: :object,
          properties: {
            organizations: {
              type: :array,
              items: {
                properties: PublicAPI::ObjectProperties::ORGANIZATION_PROPERTIES,
                type: :object
              }
            },
            pagination: {
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES,
              type: :object
            }
          }

        before do
          stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
          host! "app.talentprotocol.com"
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["organizations"].count).to eq(2)

            expect(data["organizations"].map { |organization| organization["name"] })
              .to match_array(
                [
                  organization_1.name,
                  organization_2.name
                ]
              )
          end
        end
      end

      response "200", "get all organizations with a type filter", document: false do
        let(:type) { "team" }

        schema type: :object,
          properties: {
            organizations: {
              type: :array,
              items: {
                properties: PublicAPI::ObjectProperties::ORGANIZATION_PROPERTIES,
                type: :object
              }
            },
            pagination: {
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES,
              type: :object
            }
          }

        before do
          stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
          host! "app.talentprotocol.com"
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["organizations"].count).to eq(2)

            expect(data["organizations"].map { |organization| organization["name"] })
              .to match_array(
                [
                  organization_3.name,
                  organization_4.name
                ]
              )
          end
        end
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }

        run_test!
      end
    end
  end

  path "/organizations/{id}" do
    get "Retrieves an organization" do
      tags "Organizations"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Organization slug"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:id) { organization_3.slug }

      response "200", "organization found", save_example: true do
        schema type: :object,
          properties: {
            organization: {
              properties: PublicAPI::ObjectProperties::ORGANIZATION_PROPERTIES,
              type: :object
            }
          }

        before do
          stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
          host! "app.talentprotocol.com"
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          organization = data["organization"]

          aggregate_failures do
            expect(organization["banner_url"]).to eq(organization_3.banner_url)
            expect(organization["description"]).to eq(organization_3.description)
            expect(organization["discord"]).to eq(organization_3.discord)
            expect(organization["github"]).to eq(organization_3.github)
            expect(organization["linkedin"]).to eq(organization_3.linkedin)
            expect(organization["location"]).to eq(organization_3.location)
            expect(organization["logo_url"]).to eq(organization_3.logo_url)
            expect(organization["name"]).to eq(organization_3.name)
            expect(organization["slug"]).to eq(organization_3.slug)
            expect(organization["telegram"]).to eq(organization_3.telegram)
            expect(organization["twitter"]).to eq(organization_3.twitter)
            expect(organization["type"]).to eq("team")
            expect(organization["verified"]).to eq(organization_3.verified)
            expect(organization["website"]).to eq(organization_3.website)
          end
        end
      end

      response "404", "organization not found" do
        let(:id) { "invalid" }

        before do
          stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
          host! "app.talentprotocol.com"
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }

        run_test!
      end
    end
  end
end
