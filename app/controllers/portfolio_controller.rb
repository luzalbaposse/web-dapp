class PortfolioController < ApplicationController
  PER_PAGE = 10

  def show
    @talent = TalentBlueprint.render_as_json(current_user.talent, view: :extended)
  end

  def overview
    render json: {error: "You are not logged in"}, status: :unauthorized if !current_user&.wallet_id
    render json: {error: "Chain ID is required"}, status: :bad_request if !chain_id

    total_staked = TalentSupporter.where(supporter_wallet_id: current_user.wallet_id).where(chain_id: chain_id).sum(:approximate_amount)

    render json: {total_staked: total_staked}, status: :ok
  end

  def tokens
    wallet_id = current_user.wallet_id
    supporting_relationships = TalentSupporter.where(chain_id: chain_id) if chain_id.present?
    supporting_relationships = supporting_relationships.where(supporter_wallet_id: wallet_id).order(approximate_amount: :desc).pluck(:talent_contract_id)

    talent_tokens = TalentToken.where(contract_id: supporting_relationships).in_order_of(:contract_id, supporting_relationships)

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
