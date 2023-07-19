module Activities
  class CareerNeedsUpdate < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      nil
    end

    def self.default_global_scope
      true
    end
  end
end
