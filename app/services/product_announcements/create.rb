module ProductAnnouncements
  class Create
    class Error < StandardError; end

    class CreationError < Error; end

    ATTRIBUTES = %w[content link title].freeze

    def initialize(params:)
      @params = params.deep_stringify_keys
    end

    def call
      product_announcement = ProductAnnouncement.new(params.slice(*ATTRIBUTES))

      if image_url.present?
        product_announcement.image_attacher.context[:url] = true
        product_announcement.image = Down.open(image_url)
      end

      return product_announcement if product_announcement.save

      raise CreationError, "Unable to create product announcement. Errors: #{product_announcement.errors.full_messages.join(", ")}"
    end

    private

    attr_reader :params

    def image_url
      @image_url ||= params["image_url"]
    end
  end
end
