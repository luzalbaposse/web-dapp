module Activities
  class CareerUpdate < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      nil
    end
  end
end
