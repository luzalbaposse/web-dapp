class PersonaWebhookReceivedJob < ApplicationJob
  queue_as :default

  def perform(params:)
    event_type = event_type(params)

    case event_type
    when "verification.created"
      increase_requests_counter
    end
  end

  private

  def event_type(params)
    params["attributes"]["name"]
  end

  def increase_requests_counter
    current_month_persona_request = WithPersonaRequest.current_month_persona_request
    requests_counter = current_month_persona_request.requests_counter
    current_month_persona_request.update!(requests_counter: requests_counter + 1)
  end
end
