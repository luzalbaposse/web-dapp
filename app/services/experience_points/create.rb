# Credit experience points for a user
# Only way to credit experience points for a user since it also refreshes the user sum field (experience_points_amount)
# Should be wrapped in a transaction when called
module ExperiencePoints
  class Create
    def initialize(user:, source:, amount:, description:, credited_at:)
      @user = user
      @source = source
      @amount = amount
      @description = description
      @credited_at = credited_at
    end

    def call
      experience_point = ExperiencePoint.create!(
        user: user,
        source: source,
        amount: amount,
        credited_at: credited_at,
        description: description
      )

      user.update!(experience_points_amount: ExperiencePoint.where(user: user).sum(:amount))

      experience_point
    end

    private

    attr_reader :user, :source, :amount, :description, :credited_at
  end
end
