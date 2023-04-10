class CareerUpdateBlueprint < Blueprinter::Base
  fields :id

  view :normal do
    association :user, blueprint: UserBlueprint, view: :with_pictures
  end
end
