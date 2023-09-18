module Goals
  class Destroy
    def initialize(goal:)
      @goal = goal
    end

    def call
      if goal.election.present? && goal.election.active?
        false
      else
        goal.destroy
      end
    end

    private

    attr_reader :goal
  end
end
