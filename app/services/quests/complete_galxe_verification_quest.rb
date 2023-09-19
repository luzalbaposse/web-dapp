require "web3_api/api_proxy"

module Quests
  class CompleteGalxeVerificationQuest
    class Error < StandardError; end

    class VerificationError < Error; end

    class Web3RefreshesExceededError < Error; end

    GALXE_PASSPORT_ADDRESS = "0xe84050261cb0a35982ea0f6f3d9dff4b8ed3c012"

    def initialize(user:)
      @user = user
    end

    def call
      return if already_verified?

      verify_wallet_connected!
      verify_web3_refreshes!

      user_web3_info.update!(web3_refreshed_at: Time.current)
      verify_passport_presence!

      user_web3_info.update!(galxe_passport_token_id: galxe_passport["token_id"])
      user.talent.update!(verified: true)
      Quests::RefreshUserQuest.new(user: user, quest: galxe_verification_quest, notify: true).call
    end

    private

    attr_reader :user

    def already_verified?
      user_web3_info.galxe_passport_token_id.present?
    end

    def verify_wallet_connected!
      raise VerificationError, "Verification failed. Reason: Wallet not connected." unless user.wallet_id
    end

    def verify_web3_refreshes!
      raise Web3RefreshesExceededError, "Web3 refresh attempts exceeded. Try again in the next hour." if refreshed_in_the_last_hour?
    end

    def refreshed_in_the_last_hour?
      user_web3_info.web3_refreshed_at && user_web3_info.web3_refreshed_at > (Time.current - 1.hour)
    end

    def user_web3_info
      @user_web3_info ||= UserWeb3Info.find_or_create_by!(user: user)
    end

    def verify_passport_presence!
      raise VerificationError, "Verification failed. Reason: Wallet #{user.wallet_id} does not have a galxe passport associated." unless galxe_passport.present?
    end

    def galxe_passport
      @galxe_passport ||= begin
        wallet_nfts = web3_proxy.retrieve_wallet_nfts(
          contract_addresses: [GALXE_PASSPORT_ADDRESS],
          chain: "bsc",
          wallet_address: user.wallet_id
        )
        wallet_nfts.find { |nft| nft["token_address"]&.downcase == GALXE_PASSPORT_ADDRESS }
      end
    end

    def web3_proxy
      @web3_proxy ||= Web3Api::ApiProxy.new
    end

    def galxe_verification_quest
      Quest.find_by(quest_type: "galxe_verification")
    end
  end
end
