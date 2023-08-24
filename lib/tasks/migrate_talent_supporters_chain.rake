require "csv"

namespace :talent_supporters do
  desc "Add values for approximate amount so that we can sort by it"
  task migrate_chain_id: :environment do
    puts "Updating for talent tokens #{TalentToken.where.not(contract_id: nil).count}"
    TalentToken.where.not(contract_id: nil).find_each do |talent_token|
      puts "== Updating $#{talent_token.ticker}: #{talent_token.contract_id}"
      TalentSupporter.where(talent_contract_id: talent_token.contract_id).update_all(chain_id: talent_token.chain_id)
    end
    puts "done."
  end
end
