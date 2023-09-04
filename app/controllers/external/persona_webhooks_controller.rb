class External::PersonaWebhooksController < ApplicationController
  def create
    return render json: {message: "Invalid Signature address"}, status: :unauthorized unless valid_signature?

    PersonaWebhookReceivedJob.perform_later(params: webhook_params.to_h)

    head :ok
  end

  private

  def valid_signature?
    t, v1 = request.headers["HTTP_PERSONA_SIGNATURE"].split(",").map { |value| value.split("=").second }
    computed_digest = OpenSSL::HMAC.hexdigest("SHA256", ENV["WITH_PERSONA_WEBHOOK_SECRET"], "#{t}.#{request.body.read}")

    v1 == computed_digest
  end

  def webhook_params
    params.require(:data).permit!
  end
end
