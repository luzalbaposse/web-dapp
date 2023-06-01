class NotificationBlueprint < Blueprinter::Base
  fields :id

  view :normal do
    fields :created_at, :type

    field :actionable do |record, _options|
      notification_from(record).actionable?
    end

    field :actions do |record, _options|
      notification_from(record).actions
    end

    field :body do |record, _options|
      notification_from(record).body
    end

    field :read do |record, _options|
      record.read?
    end

    field :source_name do |record, _options|
      notification_from(record).source&.name
    end

    field :source_profile_picture_url do |record, _options|
      source = notification_from(record).source

      source&.is_a?(User) ? source&.profile_picture_url : notification_from(record).recipient.profile_picture_url
    end

    field :source_verified do |record, _options|
      source = notification_from(record).source

      source&.talent&.verified? if source&.is_a?(User)
    end

    field :title do |record, _options|
      notification_from(record).title
    end

    field :url do |record, _options|
      notification_from(record).url
    end
  end

  # Cache the .to_notification transformation
  def self.notification_from(record)
    notifications[record.id] ||= record.to_notification
  end

  def self.notifications
    @notifications ||= {}
  end
end
