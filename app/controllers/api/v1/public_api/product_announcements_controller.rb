class API::V1::PublicAPI::ProcuctAnnouncementsController < API::V1::PublicAPI::APIController
  before_action :internal_only

  def latest_unread
    render json: response_body, status: :ok
  end

  def update
    product_announcement.mark_as_read_for!(current_user)

    head :ok
  end

  private

  def product_announcement
    @product_announcement ||= ProductAnnouncement.find(params[:id])
  end

  def product_announcement_params
    params.require(:product_announcement).permit(
      :read_at
    )
  end
end
