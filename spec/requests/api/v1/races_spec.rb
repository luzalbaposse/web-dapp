require "rails_helper"

RSpec.describe "Races", type: :request do
  let!(:current_user) { create :user, :with_talent }

  describe "#show" do
    subject(:get_race) { get api_v1_race_path(id: race_id, as: current_user) }

    let!(:race) { create :race }
    let(:race_id) { race.id }

    let(:race_results_class) { Races::PrepareRaceResults }
    let(:race_results_instance) { instance_double(race_results_class, call: true) }

    before do
      allow(race_results_class).to receive(:new).and_return(race_results_instance)
    end

    context "when the race exists" do
      it "returns a successful response" do
        get_race

        expect(response).to have_http_status(:ok)
      end

      it "initializes and calls the race results service with the correct arguments" do
        get_race

        aggregate_failures do
          expect(race_results_class).to have_received(:new).with(
            user: current_user,
            race: race
          )
          expect(race_results_instance).to have_received(:call)
        end
      end
    end

    context "when the race does not exist" do
      let(:race_id) { "invalid" }

      it "returns bot found" do
        get_race

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
