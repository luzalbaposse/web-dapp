require "rails_helper"

RSpec.describe API::LogRequestJob, type: :job do
  include ActiveJob::TestHelper

  let!(:api_key) { create :api_key, access_key: SecureRandom.hex }

  subject(:log_api_request) do
    API::LogRequestJob.perform_now(
      api_key_id: api_key.id,
      request_method: method,
      request_path: path,
      request_body: request_body.to_json,
      response_body: response_body.to_json,
      response_code: response_code,
      request_ip: ip
    )
  end

  let(:method) { "GET" }
  let(:path) { "/api/v1/talents" }
  let(:request_body) { {} }
  let(:response_body) { {} }
  let(:response_code) { 200 }
  let(:ip) { "127.0.01.1" }

  it "creates a new api log request" do
    expect { log_api_request }.to change(API::LogRequest, :count).from(0).to(1)
  end

  it "creates the api log request with the correct arguments" do
    log_api_request

    created_log = API::LogRequest.last

    aggregate_failures do
      expect(created_log.api_key).to eq api_key
      expect(created_log.method).to eq method
      expect(created_log.path).to eq path
      expect(created_log.request_body).to eq request_body
      expect(created_log.response_body).to eq response_body
      expect(created_log.ip).to eq ip
      expect(created_log.response_code).to eq 200
    end
  end
end
