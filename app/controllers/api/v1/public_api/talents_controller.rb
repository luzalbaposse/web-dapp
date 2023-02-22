class API::V1::PublicAPI::TalentsController < API::V1::PublicAPI::APIController
  def show
    profile = API::TalentBlueprint.render_as_json(user, view: :normal)
    render json: profile, status: :ok
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: params[:id])
  end
end
