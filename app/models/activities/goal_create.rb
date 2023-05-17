module Activities
  class GoalCreate < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      "@origin just added a new career goal!"
    end

    def self.default_global_scope
      true
    end
  end
end
