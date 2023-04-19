# frozen_string_literal: true

namespace :sponsorships do
  task update_decimals: :environment do
    Sponsorship.where(token_decimals: nil).find_each do |sponsorship|
      decimals = (sponsorship.chain_id == 137) ? 6 : 18

      sponsorship.update(token_decimals: decimals)
    end
  end
end
