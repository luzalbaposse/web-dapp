class OrganizationsController < ApplicationController
  def index
  end

  def show
    @organization = API::OrganizationBlueprint.render_as_json(
      organization,
      view: :with_election,
      current_user: current_user
    )
  end

  private

  def organization
    @organization ||= Organization.find_by!(slug: params[:id])
  end
end
