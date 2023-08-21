class API::MilestoneBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :title, :category, :end_date, :start_date, :link, :institution, :in_progress
  end
end
