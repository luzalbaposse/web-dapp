module Activities
  class Verify < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      "@origin is now a verified user."
    end

    def self.default_global_scope
      true
    end
  end
end
