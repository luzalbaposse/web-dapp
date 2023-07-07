module Organizations
  class Create
    class Error < StandardError; end

    class CreationError < Error; end

    ATTRIBUTES = %w[
      description
      discord
      github
      linkedin
      location
      name
      slug
      tags
      telegram
      twitter
      type
      verified
      website
    ].freeze

    def initialize(params:, users:, max_invite_uses: nil)
      @max_invite_uses = max_invite_uses
      @params = params.deep_stringify_keys
      @users = users
    end

    def call
      ActiveRecord::Base.transaction do
        create_organization!
          .tap do |organization|
            create_invite!(organization)
            create_memberships!(organization)
          end
      end
    end

    private

    attr_reader :max_invite_uses, :params, :users

    def create_organization!
      organization = Organization.new(params.slice(*ATTRIBUTES))

      if params["banner_url"].present?
        organization.banner_attacher.context[:url] = true
        organization.banner = Down.open(params["banner_url"])
      end

      if params["logo_url"].present?
        organization.logo_attacher.context[:url] = true
        organization.logo = Down.open(params["logo_url"])
      end

      return organization if organization.save

      raise CreationError, "Unable to create organization. Errors: #{organization.errors.full_messages.join(", ")}"
    end

    def create_invite!(organization)
      Invites::Create.new(max_uses: max_invite_uses, organization:).call
    end

    def create_memberships!(organization)
      users.each do |user|
        membership = organization.memberships.new(active: true, user:)
        raise CreationError, "Unable to create membership. Errors: #{membership.errors.full_messages.join(", ")}" unless membership.save
      end
    end
  end
end
