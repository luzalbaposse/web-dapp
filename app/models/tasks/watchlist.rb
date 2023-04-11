# frozen_string_literal: true

module Tasks
  class Watchlist < Task
    def title
      "Add 3 talents to your career circle"
    end

    def description
      "Go to a talent profile and connect with them by sending a subscription request"
    end

    def link
      "/talent"
    end
  end
end
