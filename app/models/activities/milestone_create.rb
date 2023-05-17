module Activities
  class MilestoneCreate < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      "@origin just added a new entry to their journey."
    end

    def self.default_global_scope
      true
    end
  end
end
