class API::V1::PublicAPI::ExperienceRewardsController < API::V1::PublicAPI::APIController
  before_action :authenticated_only

  def index
    rewards = ExperienceReward.active.order(:cost)

    render json: {rewards: API::ExperienceRewardBlueprint.render_as_json(rewards, view: :normal, current_user: current_user)}, status: :ok
  end

  def claim
    reward = ExperienceReward.find_by!(uuid: params[:experience_reward_id])

    service = Rewards::Claim.new(user: current_user, reward: reward)
    result = service.call

    if result
      render json: {claim: result}, status: :ok
    else
      render json: {error: "Reward has been claimed already or is out of stock"}, status: :conflict
    end
  end
end
