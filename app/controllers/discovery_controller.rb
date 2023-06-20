class DiscoveryController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        discovery_rows = DiscoveryRow.with_completed_talents.order(created_at: :desc)

        if partnerships_only?
          discovery_rows = discovery_rows.joins(:partnership)
        end

        @pagy, discovery_rows = pagy(discovery_rows, items: per_page)
        @discovery_rows = DiscoveryRowBlueprint.render_as_json(discovery_rows.includes(:visible_tags, :partnership), view: :normal)

        render(
          json: {
            discovery_rows: @discovery_rows,
            pagination: render_pagination(@pagy)
          },
          status: :ok
        )
      end
    end
  end

  def show
    discovery_row = DiscoveryRow.find_by!(slug: params[:slug])
    @discovery_row = DiscoveryRowBlueprint.render_as_json(discovery_row, view: :normal)
  end

  private

  def filter_params
    params.permit(:keyword, :status)
  end

  def per_page
    params[:per_page]
  end

  def partnerships_only?
    params[:partnerships_only] == "true"
  end
end
