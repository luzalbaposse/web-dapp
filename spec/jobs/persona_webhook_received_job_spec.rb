require "rails_helper"

RSpec.describe PersonaWebhookReceivedJob, type: :job do
  let(:params) do
    JSON.parse(file_fixture("persona_webhook_verification_created_body.json").read)
  end

  subject(:persona_webhook_job) { PersonaWebhookReceivedJob.perform_now(params: params["data"].to_h) }

  let!(:current_month_persona_request) { create :with_persona_request, month: Date.today.month, year: Date.today.year, requests_counter: 20 }

  it "increases the number of requests by 1" do
    persona_webhook_job

    expect(current_month_persona_request.reload.requests_counter).to eq(21)
  end
end
