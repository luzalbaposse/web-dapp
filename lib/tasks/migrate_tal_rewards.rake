namespace :db do
  desc "Migrate Rewards that assigned TAL to users"
  task migrate_tal_rewards: :environment do
    chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787

    puts "migrating #{Reward.where(migrated_at: nil, tx_hash: nil).count} rewards"
    Reward.where(migrated_at: nil, tx_hash: nil).find_each do |reward|
      if reward.user.wallet_id.present?
        service = Web3::MintVirtualTal.new(chain_id: chain_id)
        tx = service.call(amount: reward.amount, to: reward.user.wallet_id, reason: "in_app_rewards") do |tx_hash|
          reward.update!(tx_hash: tx_hash)
        end

        if tx
          reward.migrated_at = Time.current
          reward.identifier = tx if reward.identifier.nil?

          reward.save!
          puts "Awarded #{reward.amount} TAL to #{reward.user.username} with tx hash: #{tx}"
        else
          puts "Transaction was not able to run for #{reward.id} and #{reward.user.username}"
        end
      else
        puts "Unable to award reward"
      end
    end
  end
end
