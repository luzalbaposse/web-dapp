class API::V1::PublicAPI::SponsorshipsController < API::V1::PublicAPI::APIController
  before_action :internal_only, only: [:create]
  before_action :authenticated_only, only: [:create]

  def create
    if sponsorship_params[:tx_hash].present? && sponsorship_params[:chain_id].present?
      SyncSponsorshipJob.perform_later(sponsorship_params[:tx_hash], sponsorship_params[:chain_id])
      render json: {success: true}, status: :created
    else
      render json: {success: false}, status: :bad_request
    end
  end

  # user acted as sponsor
  def index
    sponsorships = user.sponsorships
    sponsorships = filter_by_status(sponsorships) if filter_by_status?

    pagy, sponsorships = pagy_uuid_cursor(
      sponsorships,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      sponsorships: API::SponsorshipBlueprint.render_as_json(sponsorships, view: :normal),
      pagination: {
        total: user.sponsorships.count,
        cursor: pagy.has_more? ? sponsorships.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  # user acted as talent (sponsor receiver)
  def sponsors
    sponsors = user.sponsors
    sponsors = filter_by_status(sponsors) if filter_by_status?

    pagy, sponsors = pagy_uuid_cursor(
      sponsors,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      sponsors: API::SponsorshipBlueprint.render_as_json(sponsors, view: :normal),
      pagination: {
        total: user.sponsors.count,
        cursor: pagy.has_more? ? sponsors.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by!("uuid::text = :id OR wallet_id = :id OR username = :id", id: downcase_id)
  end

  def sponsorship_params
    params.require(:sponsorship).permit(:tx_hash, :chain_id)
  end

  def filter_by_status(sponsorships)
    case filter_params[:status]
    when "claimed"
      sponsorships.claimed
    when "pending"
      sponsorships.pending
    when "revoked"
      sponsorships.revoked
    end
  end

  def filter_by_status?
    filter_params[:status].present?
  end

  def filter_params
    params.permit(:status)
  end
end
