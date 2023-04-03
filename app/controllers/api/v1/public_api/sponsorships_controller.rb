class API::V1::PublicAPI::SponsorshipsController < API::V1::PublicAPI::APIController
  before_action :internal_only

  def create
    if sponsorship_params[:tx_hash].present?
      SyncSponsorshipJob.perform_later(sponsorship_params[:tx_hash])
      render json: {success: true}, status: :created
    else
      render json: {success: false}, status: :bad_request
    end
  end

  private

  def sponsorship_params
    params.require(:sponsorship).permit(:tx_hash)
  end
end
