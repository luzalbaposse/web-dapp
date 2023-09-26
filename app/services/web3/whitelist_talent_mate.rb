module Web3
  class WhitelistTalentMate
    def call(user:, level:)
      if user.wallet_id
        resp = client.invoke({
          function_name: ENV["WHITELIST_LAMBDA_FUNCTION"],
          invocation_type: "RequestResponse",
          log_type: "None",
          payload: JSON.generate({
            wallet_id: user.wallet_id,
            level: level
          })
        })

        response = JSON.parse(resp.payload.string)

        if response["statusCode"] == 200
          user.update!(
            whitelisted_talent_mate: true
          )
        elsif response["statusCode"] == 400
          Rollbar.warning("Unable to whitelist user ##{user.id}", response: response)
          false
        elsif response["statusCode"] == 500
          Rollbar.error("Unable to whitelist user ##{user.id}", response: response)
          false
        end
      end
    end

    private

    def client
      @client ||= Aws::Lambda::Client.new(region: "eu-west-2")
    end
  end
end
