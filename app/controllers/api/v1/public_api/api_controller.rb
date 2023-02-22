# Inherit from this controller for authenticated api requests
class API::V1::PublicAPI::APIController < ActionController::Base
  before_action :validate_request

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def validate_request
    return unauthorized_request("API KEY header was not provided.") unless api_key_from_headers
    return unauthorized_request("API KEY provided is invalid.") unless api_key
    return unauthorized_request("API KEY provided was not activated or it was revoked.") unless api_key.active?
  end

  def api_key_from_headers
    @api_key_from_headers ||= request.headers["X-API-KEY"]
  end

  def api_key
    @api_key ||= API::Key.find_by(access_key: api_key_from_headers)
  end

  def unauthorized_request(error_message)
    render json: {error: error_message}, status: :unauthorized
  end

  def not_found
    respond_to do |format|
      format.json { render json: {error: "Resource not found."}, status: :not_found }
    end
  end
end
