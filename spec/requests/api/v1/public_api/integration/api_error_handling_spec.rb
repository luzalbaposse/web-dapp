require "rails_helper"

RSpec.describe "API error handling" do
  subject(:api_request) { get(api_v1_public_talent_path(id: id, params: {}), headers: headers) }
  let!(:api_key) { create :api_key, :activated, access_key: access_key }
  let(:access_key) { SecureRandom.hex }

  let!(:user) { create :user }
  let(:id) { user.username }

  let(:headers) do
    {
      "X-API-KEY": access_key
    }
  end

  context "when the request is internal" do
    let(:headers) do
      {
        "X-API-KEY": nil
      }
    end

    before do
      ENV["INTERNAL_DOMAINS"] = "beta.talentprotocol.com"
      host! "beta.talentprotocol.com"
    end

    it "does not enqueue a job to log the request" do
      expect { api_request }.not_to have_enqueued_job(API::LogRequestJob)
    end
  end

  context "when a valid api key is passed" do
    it "enqueues a job to log the request" do
      expect { api_request }.to have_enqueued_job(API::LogRequestJob)
    end

    it "enqueues a the job with the correct arguments" do
      api_request

      expect(API::LogRequestJob).to have_been_enqueued.with(
        api_key_id: api_key.id,
        request_path: "/api/v1/talents/#{id}",
        request_method: "GET",
        request_ip: "127.0.0.1",
        request_body: instance_of(String),
        response_body: response.body,
        response_code: response.status
      )
    end
  end

  context "when an invalid api key is passed" do
    let(:headers) do
      {
        "X-API-KEY": "invalid"
      }
    end

    it "does not enqueue a job to log the request" do
      expect { api_request }.not_to have_enqueued_job(API::LogRequestJob)
    end
  end

  context "when a not found error happen" do
    let(:id) { "invalid" }

    it "enqueues a job to log the request" do
      expect { api_request }.to have_enqueued_job(API::LogRequestJob)
    end

    it "enqueues a the job with the correct arguments" do
      api_request

      expect(API::LogRequestJob).to have_been_enqueued.with(
        api_key_id: api_key.id,
        request_path: "/api/v1/talents/#{id}",
        request_method: "GET",
        request_ip: "127.0.0.1",
        request_body: instance_of(String),
        response_body: response.body,
        response_code: 404
      )
    end
  end

  context "when there's an internal error" do
    let(:error) { StandardError.new }

    before do
      allow(API::TalentBlueprint).to receive(:render_as_json).and_raise(error)
      allow(Rollbar).to receive(:error)
    end

    it "enqueues a job to log the request" do
      expect { api_request }.to have_enqueued_job(API::LogRequestJob)
    end

    it "enqueues a the job with the correct arguments" do
      api_request

      expect(API::LogRequestJob).to have_been_enqueued.with(
        api_key_id: api_key.id,
        request_path: "/api/v1/talents/#{id}",
        request_method: "GET",
        request_ip: "127.0.0.1",
        request_body: instance_of(String),
        response_body: response.body,
        response_code: 500
      )
    end

    it "raises the error to Rollbar" do
      api_request

      expect(Rollbar).to have_received(:error).with(
        error,
        {
          header_api_key: access_key,
          request_path: "/api/v1/talents/#{id}",
          request_method: "GET",
          request_ip: "127.0.0.1",
          request_body: instance_of(String),
          params: instance_of(String)
        }
      )
    end
  end
end
