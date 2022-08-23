namespace :invite_codes do
  task change_all_codes: :environment do
    # Make sure every user has an invite with their code
    count = User.count
    User.find_each do |user|
      puts "update invite for user #{user.id}/#{count}"
      if user.admin?
        invite = Invite.find_by(code: user.username)
        if invite.nil?
          invite = Invite.new
          invite.talent_invite = false
          invite.code = user.username
          invite.user = user
        end
        invite.max_uses = nil
        invite.save
      else
        invite = user.invites.first
        if invite.nil?
          invite = Invite.new
          invite.user = user
        end
        invite.code = user.username
        invite.max_uses = nil
        invite.talent_invite = nil
        invite.save!
      end
    end

    puts "Merging invites"

    # merge all invites
    User.where.not(role: "admin").find_each do |user|
      puts "merging invites for user #{user.id}/#{count}"
      invite = Invite.find_by(code: user.username)

      invites = Invite.where(user_id: user.id).where.not(id: invite.id)
      if invites.length > 0
        users = User.where(invite_id: invites.map(&:id))

        invite.uses = invite.uses + users.count
        invite.save!

        users.update_all(invite_id: invite.id)
        invites.destroy_all
      end
    end
  end
end
