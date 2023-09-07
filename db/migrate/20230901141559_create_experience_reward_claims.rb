class CreateExperienceRewardClaims < ActiveRecord::Migration[7.0]
  def change
    create_table :experience_reward_claims do |t|
      t.references :experience_reward, null: false, foreign_key: true, index: true
      t.references :user, null: false, foreign_key: true, index: true
      t.timestamps
    end
  end
end
