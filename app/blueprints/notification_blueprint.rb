class NotificationBlueprint < Blueprinter::Base
  fields :id

  view :normal do
    fields :created_at, :type

    field :body do |record, _options|
      notification_from(record).body
    end

    field :button_label do |record, _options|
      label(notification_from(record).button_label)
    end

    field :read do |record, _options|
      record.read?
    end

    field :secondary_button_label do |record, _options|
      label(notification_from(record).secondary_button_label)
    end

    field :source_name do |record, _options|
      notification_from(record).source&.name
    end

    field :source_profile_picture_url do |record, _options|
      notification_from(record).source&.profile_picture_url
    end

    field :source_verified do |record, _options|
      notification_from(record).source&.talent&.verified?
    end

    field :title do |record, _options|
      notification_from(record).title
    end

    field :url do |record, _options|
      notification_from(record).url
    end
  end

  def self.label(label)
    label.starts_with?("translation missing:") ? nil : label
  end

  # Cache the .to_notification transformation
  def self.notification_from(record)
    notifications[record.id] ||= record.to_notification
  end

  def self.notifications
    @notifications ||= {}
  end
end
