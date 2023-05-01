require "web3_api/api_proxy"

module Metrics
  module SmartContract
    TRANSACTIONS_KPI_START_DATE = Date.new(2023, 0o1, 0o1).to_time.to_i

    # Due to contract migrations we are tracking two polygon contracts
    # Last old staking valid transaction: https://polygonscan.com/tx/0x7a94700696f756cd91ea2d1bf299fc29f0ce840ef06a4b52089c107365d8123f
    POLYGON_OLD_STAKING = {
      "address" => "0xe23104e89ff4c93a677136c4cbdfd2037b35be67",
      "start_tracking" => TRANSACTIONS_KPI_START_DATE,
      "stop_tracking" => Date.new(2023, 0o3, 23).to_time.to_i
    }
    # First current staking valid transaction: https://polygonscan.com/tx/0x70a7cd7267c637946a480a0c29917f3067bde29224af4dd0fb40a792a21dacc3
    POLYGON_CURRENT_STAKING = {
      "address" => "0xEa998Ff9c0c075cD035b25095D1833E5aF0aF873",
      "start_tracking" => Date.new(2023, 0o4, 15).to_time.to_i
    }
    POLYGON_OLD_FACTORY = {
      "address" => "0xbbfeda7c4d8d9df752542b03cdd715f790b32d0b",
      "start_tracking" => TRANSACTIONS_KPI_START_DATE,
      "stop_tracking" => Date.new(2023, 0o3, 23).to_time.to_i
    }
    POLYGON_CURRENT_FACTORY = {
      "address" => "0xa91b75e8aa2dc62b2957333b1a1412532444fde0",
      "start_tracking" => Date.new(2023, 0o4, 15).to_time.to_i
    }
    POLYGON_SPONSORSHIP_ADDRESS = "0x332f92d166C52A34B464c9b63D710AC2397B0fd8"
    POLYGON_MATES_ADDRESS = "0x41033160a2351358ddc1b97edd0bc6f00cdeca92"
    POLYGON_STABLE_DECIMALS = 1e6

    CELO_STAKING_ADDRESS = "0x5a6eF881E3707AAf7201dDb7c198fc94B4b12636"
    CELO_SPONSORSHIP_ADDRESS = "0x5b89a39b381138E02C32691a22B30f833D1Cd834"
    CELO_FACTORY_ADDRESS = "0xa902DA7a40a671B84bA3Dd0BdBA6FD9d2D888246"

    ETH_TAL_SUBDOMAIN_ADDRESS = "0xe86C5ea96eA47D3A9D835672C1428329bD0bb7Af"

    def total_celo_tokens
      TalentToken.where(chain_id: 42220, deployed: true).count
    end

    def total_celo_supporters
      celo_contracts = TalentToken.where(chain_id: 42220, deployed: true).pluck(:contract_id)
      TalentSupporter.where(talent_contract_id: celo_contracts).distinct.count(:supporter_wallet_id)
    end

    def total_polygon_tokens
      TalentToken.where(chain_id: 137, deployed: true).count
    end

    def total_polygon_supporters
      polygon_contracts = TalentToken.where(chain_id: 137, deployed: true).pluck(:contract_id)
      TalentSupporter.where(talent_contract_id: polygon_contracts).distinct.count(:supporter_wallet_id)
    end

    def collect_polygon_transactions(daily_metric)
      staking_count = web3_proxy.retrieve_transactions_count(
        address: POLYGON_OLD_STAKING["address"],
        chain: "polygon",
        start_timestamp: POLYGON_OLD_STAKING["start_tracking"],
        end_timestamp: POLYGON_OLD_STAKING["stop_tracking"]
      ).to_i
      staking_count += web3_proxy.retrieve_transactions_count(
        address: POLYGON_CURRENT_STAKING["address"],
        chain: "polygon",
        start_timestamp: POLYGON_CURRENT_STAKING["start_tracking"]
      ).to_i
      staking_count += web3_proxy.retrieve_transactions_count(
        address: POLYGON_OLD_FACTORY["address"],
        chain: "polygon",
        start_timestamp: POLYGON_OLD_FACTORY["start_tracking"],
        end_timestamp: POLYGON_OLD_FACTORY["stop_tracking"]
      ).to_i
      staking_count += web3_proxy.retrieve_transactions_count(
        address: POLYGON_CURRENT_FACTORY["address"],
        chain: "polygon",
        start_timestamp: POLYGON_CURRENT_FACTORY["start_tracking"],
        end_timestamp: POLYGON_CURRENT_FACTORY["stop_tracking"]
      ).to_i
      sponsorship_count = web3_proxy.retrieve_transactions_count(
        address: POLYGON_SPONSORSHIP_ADDRESS,
        chain: "polygon",
        start_timestamp: TRANSACTIONS_KPI_START_DATE
      ).to_i

      daily_metric.total_polygon_stake_transactions = staking_count.to_i
      daily_metric.total_polygon_sponsorship_transactions = sponsorship_count.to_i
      daily_metric.total_mates_nfts = total_mates_nfts.to_i
      daily_metric
    end

    def total_mates_nfts
      web3_proxy.retrieve_polygon_nfts_count(
        address: POLYGON_MATES_ADDRESS
      )
    end

    def collect_celo_transactions(daily_metric)
      staking_count = web3_proxy.retrieve_transactions_count(
        address: CELO_STAKING_ADDRESS,
        chain: "celo",
        start_timestamp: TRANSACTIONS_KPI_START_DATE
      ).to_i
      staking_count += web3_proxy.retrieve_transactions_count(
        address: CELO_FACTORY_ADDRESS,
        chain: "celo",
        start_timestamp: TRANSACTIONS_KPI_START_DATE
      ).to_i
      sponsorship_count = web3_proxy.retrieve_transactions_count(
        address: CELO_SPONSORSHIP_ADDRESS,
        chain: "celo",
        start_timestamp: TRANSACTIONS_KPI_START_DATE
      ).to_i

      daily_metric.total_celo_stake_transactions = staking_count.to_i
      daily_metric.total_celo_sponsorship_transactions = sponsorship_count.to_i
      daily_metric
    end

    def total_tal_subdomain_transactions
      web3_proxy.retrieve_transactions_count(
        address: ETH_TAL_SUBDOMAIN_ADDRESS,
        chain: "eth",
        start_timestamp: TRANSACTIONS_KPI_START_DATE
      ).to_i
    end

    # TVL in USD
    def total_polygon_tvl
      (polygon_provider.call(polygon_staking_contract, "totalTokensStaked") * TalentToken::TAL_VALUE_IN_USD) / TalentToken::TAL_DECIMALS
    end

    # TVL in USD
    def total_celo_tvl
      (celo_provider.call(celo_staking_contract, "totalTokensStaked") * TalentToken::TAL_VALUE_IN_USD) / TalentToken::TAL_DECIMALS
    end

    def total_stables_stored_polygon
      polygon_provider.call(polygon_staking_contract, "totalStableStored") / POLYGON_STABLE_DECIMALS
    end

    def total_stables_stored_celo
      celo_provider.call(celo_staking_contract, "totalStableStored") / TalentToken::TAL_DECIMALS
    end

    def tal_rewards_given_polygon
      polygon_provider.call(polygon_staking_contract, "rewardsGiven") / TalentToken::TAL_DECIMALS
    end

    def tal_rewards_given_celo
      celo_provider.call(celo_staking_contract, "rewardsGiven") / TalentToken::TAL_DECIMALS
    end

    def polygon_staking_contract
      @polygon_staking_contract ||= Eth::Contract.from_abi(name: staking_contract_abi["contractName"], address: POLYGON_CURRENT_STAKING["address"], abi: staking_contract_abi["abi"])
    end

    def celo_staking_contract
      @celo_staking_contract ||= Eth::Contract.from_abi(name: staking_contract_abi["contractName"], address: CELO_STAKING_ADDRESS, abi: staking_contract_abi["abi"])
    end

    def polygon_provider
      @polygon_provider ||= Eth::Client.create "https://polygon-rpc.com"
    end

    def celo_provider
      @celo_provider ||= Eth::Client.create "https://forno.celo.org"
    end

    def staking_contract_abi
      @staking_contract_abi ||= JSON.parse(File.read("lib/abi/Staking.json"))
    end

    def web3_proxy
      @web3_proxy ||= Web3Api::ApiProxy.new
    end
  end
end
