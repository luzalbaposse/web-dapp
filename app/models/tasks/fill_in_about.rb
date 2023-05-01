# frozen_string_literal: true

module Tasks
  class FillInAbout < Task
    def title
      "Profile: About"
    end

    def description
      "Add information to your profile to be eligible to compete in the Referral Race"
    end

    def link
      "/u/#{quest.user.username}#about"
    end
  end
end
