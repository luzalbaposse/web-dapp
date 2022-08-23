class TagBlueprint < Blueprinter::Base
  fields :id, :description

  view :normal do
    field :user_tags_count
  end
end
