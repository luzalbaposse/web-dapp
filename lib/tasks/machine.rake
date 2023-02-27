namespace :machine do
  task prime: ["db:seed"] do
    puts "Setting up Admin user"

    user = User.create!(
      username: "Talent Protocol",
      email: "admin@talentprotocol.com",
      wallet_id: "0x#{SecureRandom.hex(32)}",
      password: SecureRandom.base64(12),
      role: "admin",
      email_confirmed_at: Time.current
    )
    user.create_investor!
    user.create_talent!

    user.talent.create_talent_token!(ticker: "TAL")

    puts "Setting up invites.."

    invite = Invite.new
    invite.user = user
    invite.talent_invite = true
    invite.code = Invite.generate_code
    invite.save!

    puts "Your invite that creates talents is: ##{invite.id} - #{invite.code}"

    invite = Invite.new
    invite.user = user
    invite.talent_invite = false
    invite.code = Invite.generate_code
    invite.save!

    puts "Your invite that creates supporters is: ##{invite.id} - #{invite.code}"
  end
end
