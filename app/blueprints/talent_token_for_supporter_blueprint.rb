class TalentTokenForSupporterBlueprint < Blueprinter::Base
  fields :id, :ticker, :contract_id

  field :display_name do |talent_token, _options|
    talent_token.talent.user.name
  end

  field :occupation do |talent_token, _options|
    talent_token.talent.occupation
  end

  field :profile_picture_url do |talent_token, _options|
    talent_token.talent.profile_picture_url
  end

  field :amount do |talent_token, options|
    TalentSupporter.find_by(talent_contract_id: talent_token.contract_id, supporter_wallet_id: options[:supporter_wallet_id])&.amount
  end

  field :tal_amount do |talent_token, options|
    TalentSupporter.find_by(talent_contract_id: talent_token.contract_id, supporter_wallet_id: options[:supporter_wallet_id])&.tal_amount
  end

  field :first_time_bought_at do |talent_token, options|
    TalentSupporter.find_by(talent_contract_id: talent_token.contract_id, supporter_wallet_id: options[:supporter_wallet_id])&.first_time_bought_at
  end

  field :connection_type do |talent_token, options|
    user = talent_token.talent.user
    connected_user = User.find_by(wallet_id: options[:supporter_wallet_id])
    Connection.find_by(user: user, connected_user: connected_user)&.connection_type
  end
end
