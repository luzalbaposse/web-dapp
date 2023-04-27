class API::ProductAnnouncementBlueprint < Blueprinter::Base
  view :normal do
    fields :content, :image_url, :link, :title

    field :id do |product_announcement, _options|
      product_announcement.uuid
    end
  end
end
