class PortfolioController < ApplicationController
  PER_PAGE = 10

  def show
    @talent = TalentBlueprint.render_as_json(current_user.talent, view: :extended)
  end

  def tokens
    wallet_id = current_user.wallet_id
    supporting_relationships = TalentSupporter.where(supporter_wallet_id: wallet_id).pluck(:talent_contract_id)

    talent_tokens = TalentToken.where(contract_id: supporting_relationships)

    talent_tokens = talent_tokens.where(chain_id: chain_id) if chain_id.present?

    @pagy, talent_tokens = pagy(talent_tokens, items: per_page)

    @talent_tokens = TalentTokenForSupporterBlueprint.render_as_json(
      talent_tokens,
      supporter_wallet_id: wallet_id
    )

    render(
      json: {
        talent_tokens: @talent_tokens,
        pagination: render_pagination(@pagy)
      },
      status: :ok
    )
  end

  private

  def per_page
    params[:per_page] || PER_PAGE
  end

  def chain_id
    params[:chain_id]
  end
end
