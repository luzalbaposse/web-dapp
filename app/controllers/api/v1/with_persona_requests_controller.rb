class API::V1::WithPersonaRequestsController < ApplicationController
  def update
    requests_counter = with_persona_request.requests_counter
    with_persona_request.update(requests_counter: requests_counter + 1)

    render json: WithPersonaRequestBlueprint.render_as_json(with_persona_request), status: :ok
  end

  private

  def with_persona_request
    @with_persona_request ||= WithPersonaRequest.find_by(
      month: Date.today.month,
      year: Date.today.year
    )
  end
end
