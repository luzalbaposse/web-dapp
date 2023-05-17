module Activities
  class GoalUpdate < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      "@origin just updated their career goal."
    end

    def self.default_global_scope
      true
    end
  end
end
