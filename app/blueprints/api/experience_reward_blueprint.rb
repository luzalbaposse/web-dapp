class API::ExperienceRewardBlueprint < Blueprinter::Base
  view :normal do
    fields :uuid, :image_url, :title, :description, :cost, :stock, :active

    field :claimed do |experience_reward, options|
      if options[:current_user].present?
        experience_reward.claimed?(options[:current_user])
      else
        false
      end
    end
  end
end
