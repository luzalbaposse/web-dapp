namespace :db do
  desc "Migrate Rewards that assigned TAL to users"
  task migrate_tal_rewards: :environment do
    chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
    service = Web3::MintVirtualTal.new(chain_id: chain_id)

    puts "migrating #{Reward.where(migrated_at: nil).count} rewards"
    Reward.where(migrated_at: nil).find_each do |reward|
      if reward.user.wallet_id.present?
        tx = service.call(amount: reward.amount, to: reward.user.wallet_id, reason: "in_app_rewards")
        if tx
          reward.update!(migrated_at: Time.current)
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
