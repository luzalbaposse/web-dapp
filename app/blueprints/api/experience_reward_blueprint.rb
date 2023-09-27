class API::ExperienceRewardBlueprint < Blueprinter::Base
  view :normal do
    fields :uuid, :image_url, :title, :description, :cost, :stock, :active, :type

    field :claimed do |experience_reward, options|
      if options[:current_user].present?
        experience_reward.claimed?(options[:current_user])
      else
        false
      end
    end

    field :merch_code do |experience_reward, options|
      if options[:current_user].present? && experience_reward.claimed?(options[:current_user])
        experience_reward.merch_code(options[:current_user])
      end
    end
  end
end
