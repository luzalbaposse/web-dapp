class OrganizationsController < ApplicationController
  def index
  end

  def show
    @organization = API::OrganizationBlueprint.render_as_json(organization, view: :normal)
  end

  private

  def organization
    @organization ||= Organization.find_by!(slug: params[:id])
  end
end
