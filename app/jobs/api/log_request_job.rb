module API
  class LogRequestJob < ApplicationJob
    queue_as :low

    def perform(
      api_key_id:,
      request_path:,
      request_method:,
      request_ip:,
      request_body:,
      response_body:,
      response_code:
    )
      API::LogRequest.create!(
        api_key_id: api_key_id,
        method: request_method,
        path: request_path,
        request_body: request_body.present? ? JSON.parse(request_body) : {},
        response_body: response_body.present? ? JSON.parse(response_body) : {},
        response_code: response_code,
        ip: request_ip
      )
    end
  end
end
