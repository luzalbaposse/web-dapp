class API::V1::PublicAPI::FollowsController < ApplicationController
  before_action :internal_only

  def index
    user = current_impersonated_user || current_user
    return not_found unless user

    render json: {
      follows: current_user.follows,
      following: current_user.following
    }, status: :ok
  end

  def create
    user = current_impersonated_user || current_user
    return not_found unless user

    Follows::Create.new(follower_user: current_user, following_user: following_user).call

    render json: {success: "Follow successfully created."}, status: :created
  rescue Follows::Create::AlreadyExistsError
    render json: {error: "Already following."}, status: :conflict
  rescue Follows::Create::CreationError => error
    Rollbar.error(error, "Error creating follow", current_user_id: current_user.id, following_user_id: following_user.id)
    render json: {error: "Unable to create follow."}, status: :bad_request
  end

  def destroy
    user = current_impersonated_user || current_user
    return not_found unless user

    follow = Follow.find_by!(user: following_user, follower: current_user)

    Follows::Destroy.new(follow: follow).call

    render json: {success: "Follow successfully removed."}, status: :ok
  rescue Follows::Destroy::DestroyError => error
    Rollbar.error(error, "Error destroying follow", current_user_id: current_user.id, following_user_id: following_user.id, follow_id: follow.id)
    render json: {error: "Unable to remove follow."}, status: :bad_request
  end

  private

  def follow_params
    params.permit(:user_id)
  end

  def following_user
    @following_user ||= User.find(follow_params[:user_id])
  end
end
