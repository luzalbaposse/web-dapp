class API::V1::ElectionsController < ApplicationController
  PER_PAGE = 10

  def index
    elections = Election.active.all

    pagy, elections = pagy(elections, items: per_page)
    elections = API::ElectionBlueprint.render_as_json(elections, view: :normal)

    render(
      json: {
        notifications: elections,
        pagination: {
          currentPage: pagy.page,
          lastPage: pagy.last
        }
      },
      status: :ok
    )
  end

  def vote
    service = Elections::Vote.new(
      voter: current_user,
      election: election,
      candidate: candidate,
      number_of_votes: params[:number_of_votes],
      chain_id: params[:chain_id]
    )
    result = service.call

    if result[:success]
      render json: @election
    else
      render json: {error: result[:error]}, status: :unprocessable_entity
    end
  end

  private

  def per_page
    params[:per_page] || PER_PAGE
  end

  def candidate
    @candidate ||= User.find_by(uuid: params[:candidate_id])
  end

  def election
    @election ||= Election.find(params[:election_id])
  end
end
