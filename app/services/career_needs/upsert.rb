module CareerNeeds
  class Upsert
    class Error < StandardError; end

    def initialize(career_goal:, titles: [])
      @career_goal = career_goal
      @titles = titles
    end

    def call
      CareerNeed.transaction do
        destroy_career_needs
        upsert_career_needs
      end

      create_activity
    end

    private

    attr_reader :career_goal, :titles

    def destroy_career_needs
      career_goal.career_needs.where.not(title: titles).delete_all
    end

    def upsert_career_needs
      career_needs_title_to_add = titles.select { |title| !career_goal.career_needs.pluck(:title).include? title }
      career_needs_title_to_add&.each do |title|
        CareerNeed.find_or_create_by!(career_goal: career_goal, title: title)
      end
    end

    def career_needs_message
      career_needs = career_goal.career_needs.reload.pluck(:title).to_sentence(last_word_connector: " and ").downcase
      "@origin is open to #{career_needs}."
    end

    def create_activity
      ActivityIngestJob.perform_later(
        "career_needs_update",
        career_needs_message,
        career_goal.talent.user_id
      )
    end
  end
end
