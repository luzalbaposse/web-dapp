class API::V1::RacesController < ApplicationController
  def show
    if race
      service = Races::PrepareRaceResults.new(race: race, user: current_user)
      race_results = service.call

      render json: race_results, status: :ok
    else
      render json: {error: "Not found."}, status: :not_found
    end
  end

  private

  def race
    @race ||= Race.find_by(id: params[:id])
  end
end
