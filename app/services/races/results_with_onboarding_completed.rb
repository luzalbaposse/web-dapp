module Races
  class ResultsWithOnboardingCompleted
    def call(race:)
      <<~SQL
        SELECT count(users.id) as overall_result, invited_by.id 
        FROM users
        INNER JOIN invites ON users.invite_id = invites.id
        INNER JOIN users AS invited_by ON invited_by.id = invites.user_id
        WHERE users.onboarded_at between '#{race.started_at}' and '#{race.ends_at}'
        AND invited_by.role != 'admin'
        GROUP BY invited_by.id
        ORDER BY overall_result DESC
      SQL
    end
  end
end
