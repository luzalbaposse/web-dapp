require "web3_api/api_proxy"

module Elections
  class Vote
    def initialize(voter:, election:, candidate:, number_of_votes:, chain_id:)
      @voter = voter
      @election = election
      @candidate = candidate
      @number_of_votes = number_of_votes
      @chain_id = chain_id
      @supported_chains = (ENV["CONTRACTS_ENV"] == "production") ? [137, 42220] : [44787, 80001]
      @vote = nil
    end

    def call
      return {error: "No wallet connected."} if voter.wallet_id.nil?
      return {error: "The voting period is not active."} unless election.voting_active?
      return {error: "At least one vote must be cast."} if number_of_votes < 1
      return {error: "You cannot vote for yourself."} if candidate == voter
      return {error: "Unsupported chain."} unless supported_chains.include?(chain_id)
      return {error: "You cannot vote for someone who is not a candidate."} unless election.candidates.include?(candidate)

      balance = client.call(tal_contract, "getBalance", voter.wallet_id)
      decimals = "1#{"0" * 18}"
      cost_of_votes = 0

      ::Vote.transaction do
        current_vote_count = election.votes.where(candidate: candidate).sum(&:amount)

        number_of_votes.times do |i|
          cost_of_votes += (current_vote_count + i + 1) * decimals.to_i
        end

        return {error: "Insufficient virtual TAL balance. Try a different chain."} if balance < cost_of_votes

        @vote = ::Vote.new
        @vote.voter = voter
        @vote.election = election
        @vote.candidate = candidate
        @vote.amount = number_of_votes
        @vote.cost = cost_of_votes.to_s
        @vote.save!
        @vote
      end

      DeductTalForVoteJob.perform_later(vote_id: @vote.id, chain_id: chain_id)

      {success: true}
    end

    private

    attr_reader :voter, :election, :candidate, :number_of_votes, :chain_id, :supported_chains

    def client
      Eth::Client.create rpc_url
    end

    def rpc_url
      return ENV["CELO_RPC_URL"] if celo_chain?

      ENV["POLYGON_RPC_URL"]
    end

    def celo_chain?
      (Web3Api::ApiProxy::CELO_CHAIN.include?(chain_id.to_s) || Web3Api::ApiProxy::TESTNET_CELO_CHAIN.include?(chain_id.to_s))
    end

    def tal_contract_abi
      @tal_contract_abi ||= JSON.parse(File.read("lib/abi/VirtualTAL.json"))
    end

    def tal_address
      return ENV["VIRTUAL_TAL_ADDRESS_CELO"] if celo_chain?

      ENV["VIRTUAL_TAL_ADDRESS_POLYGON"]
    end

    def tal_contract
      Eth::Contract.from_abi(name: "VirtualTAL", address: tal_address, abi: tal_contract_abi["abi"])
    end
  end
end
