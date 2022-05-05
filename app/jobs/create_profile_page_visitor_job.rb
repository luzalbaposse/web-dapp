class CreateProfilePageVisitorJob < ApplicationJob
  queue_as :default

  def perform(ip:, user_id:)
    user = User.find(user_id)

    API::CreateProfilePageVisitor.new.call(ip: ip, user: user)
  end
end
