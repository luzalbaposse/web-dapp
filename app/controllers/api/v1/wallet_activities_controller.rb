class API::V1::WalletActivitiesController < ApplicationController
  PER_PAGE = 10

  def index
    wallet_activities = current_user.wallet_activities.where(chain_id: chain_id).order(tx_date: :desc)

    pagy, wallet_activities = pagy(wallet_activities, items: per_page)

    render(
      json: {
        wallet_activities: wallet_activities,
        pagination: {
          currentPage: pagy.page,
          lastPage: pagy.last
        }
      },
      status: :ok
    )
  end

  def create
    service = Web3::RewardsSync.new(create_params[:tx_hash], create_params[:chain_id])
    wallet_activity = service.call

    if wallet_activity.save
      render json: wallet_activity, status: :created
    else
      render json: {errors: wallet_activity.errors}, status: :unprocessable_entity
    end
  end

  private

  def create_params
    params.require(:tx_hash, :chain_id)
  end

  def chain_id
    params.require(:chain_id)
  end

  def per_page
    params[:per_page] || PER_PAGE
  end
end
