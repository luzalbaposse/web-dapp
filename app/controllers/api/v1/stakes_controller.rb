class API::V1::StakesController < ApplicationController
  def create
    return render json: {error: "Not found."}, status: :not_found unless token

    Stakes::Create.new(
      token: token,
      staking_user: current_user
    ).call

    render json: {success: "Stake created."}, status: :ok
  end

  def reward_claiming
    claimed_token = Token.find_by(contract_id: stake_params[:token_id].downcase)

    return render json: {error: "Not found."}, status: :not_found unless claimed_token

    Stakes::RewardClaim.new(token: claimed_token).call

    render json: {success: "Rewards claimed successfuly."}, status: :ok
  end

  private

  def token
    @token ||= Token.find_by(id: stake_params[:token_id])
  end

  def stake_params
    params.require(:stake).permit(
      :token_id
    )
  end
end
