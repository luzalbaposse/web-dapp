namespace :db do
  desc "Migrate Rewards that assigned TAL to users"
  task migrate_tal_rewards: :environment do
    # missing onchain transaction

    Reward.where(imported: false).find_each do |reward|
      if reward.user.wallet_id.present?
        wallet_activity = WalletActivity.find_or_initialize_by(
          user: reward.user,
          wallet: reward.user.wallet_id,
          tx_date: Time.current,
          token: reward.amount.to_s + "000000000000000000",
          symbol: "TAL",
          tx_hash: "0xe0a9044fcfa63f2acb6ce5004c14516c4cff50924cf6229184a10f03a5b522a1", # TODO REPLACE WITH ACTUAL TX
          chain_id: 44787,
          event_type: "AdminMinted"
        )
        wallet_activity.save!

        reward.update!(imported: "true")
      else
        puts "Unable to award reward"
      end
    end
  end
end
