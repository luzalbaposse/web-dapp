class API::V1::PublicAPI::OrganizationsController < API::V1::PublicAPI::APIController
  before_action :internal_only

  PER_PAGE = 9

  TYPES = {
    "community" => "Organizations::Community",
    "team" => "Organizations::Team",
    "election" => "Organizations::Election"
  }.freeze

  def index
    all_organizations = Organization.all.order(priority: :asc, created_at: :desc)
    all_organizations = all_organizations.where("name ILIKE ?", "%#{keyword_param}%") if keyword_param.present?
    all_organizations = all_organizations.where(type: TYPES[type_param]) if type_param.present?
    all_organizations = all_organizations.where("memberships_count > ?", 3)

    pagy, organizations = pagy(all_organizations, items: per_page)

    response_body = {
      organizations: API::OrganizationBlueprint.render_as_json(organizations.includes([:tags, users: :talent]), view: :simple),
      pagination: {
        currentPage: pagy.page,
        lastPage: pagy.last
      }
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def show
    render json: {
      organization: API::OrganizationBlueprint.render_as_json(organization, view: :normal)
    }, status: :ok
  end

  private

  def organization
    @organization ||= Organization.find_by!(slug: params[:id])
  end

  def organization_params
    params.permit(:keyword, :type)
  end

  def per_page
    params[:per_page] || PER_PAGE
  end

  def keyword_param
    @keyword_param ||= organization_params[:keyword]&.downcase
  end

  def type_param
    @type_param ||= organization_params[:type]&.downcase
  end
end
