class API::MilestoneBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :title, :category, :end_date, :start_date, :link, :institution, :in_progress, :description
  end

  view :with_images do
    include_view :normal

    association :milestone_images, blueprint: MilestoneImageBlueprint, view: :normal, name: :images
  end
end
