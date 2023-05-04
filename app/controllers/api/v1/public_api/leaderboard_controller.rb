class API::V1::PublicAPI::LeaderboardController < API::V1::PublicAPI::APIController
  def index
    current_race = Race.active_race
    count_hash = {}
    parsed_count_hash = {}
    results = User
      .where.not(invite_id: nil)
      .where("created_at >= ? and created_at <= ?", current_race.started_at, current_race.ends_at)
      .group_by(&:invite_id)
      .each do |k, v|
        v.each do |user|
          if count_hash.key?(user.invite_id)
            count_hash[user.invite_id][:count] += 1
          else
            count_hash[user.invite_id] = {
              id: user.invite_id,
              count: 1
            }
          end
        end
      end
    talents = User.where(id: results.keys)
    talents.each do |v|
      parsed_count_hash[v[:uuid]] = count_hash[v[:id]][:count]
    end
    render json: {
      results: parsed_count_hash,
      users: API::TalentBlueprint.render_as_json(talents, view: :normal)
    }, status: :ok
  end
end
