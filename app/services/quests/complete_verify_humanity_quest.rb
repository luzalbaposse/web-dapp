require "worldcoin/client"

module Quests
  class CompleteVerifyHumanityQuest
    class Error < StandardError; end

    class VerificationError < Error; end

    WORLDCOIN_QUEST_ACTION = ENV["WORLDCOIN_QUEST_ACTION"]

    def initialize(user:, quest:, params:)
      @user = user
      @quest = quest
      @params = params
    end

    def call
      return if already_verified?

      verify_proof!

      user.update!(humanity_verified_at: Time.current, humanity_proof: proof.to_json)

      Quests::RefreshUserQuest.new(user: user, quest: quest, notify: true).call
    end

    private

    attr_reader :user, :quest, :params

    def already_verified?
      user.humanity_verified_at.present?
    end

    def verify_proof!
      return true if worldcoin_response_body["success"]

      raise VerificationError, "Verification failed with code: #{worldcoin_response_body["code"]}. Detail: #{worldcoin_response_body["detail"]}"
    end

    def worldcoin_response_body
      @worldcoin_response_body ||= JSON.parse(worldcoin_response.body)
    end

    def worldcoin_response
      @worldcoin_response ||= worldcoin_client.verify(proof: proof.to_json)
    end

    def proof
      @proof ||= params.merge(
        action: WORLDCOIN_QUEST_ACTION,
        signal: "signal-#{user.username}"
      )
    end

    def worldcoin_client
      Worldcoin::Client.new
    end
  end
end
