class API::V1::PublicAPI::ProductAnnouncementsController < API::V1::PublicAPI::APIController
  before_action :internal_only
  before_action :authenticated_only

  def latest_unread
    if current_user && latest_product_announcement && !latest_product_announcement.read?(current_user)
      render json: {
        product_announcement: API::ProductAnnouncementBlueprint.render_as_json(latest_product_announcement, view: :normal)
      }, status: :ok
    else
      render json: {product_announcement: nil}, status: :ok
    end
  end

  def update
    product_announcement.mark_as_read_for!(current_user)

    render json: {
      product_announcement: API::ProductAnnouncementBlueprint.render_as_json(product_announcement, view: :normal)
    }, status: :ok
  end

  private

  def latest_product_announcement
    @latest_product_announcement ||= ProductAnnouncement.order(:created_at).last
  end

  def product_announcement
    @product_announcement ||= ProductAnnouncement.find_by(uuid: params[:id])
  end
end
