class BaseNotification < Noticed::Base
  deliver_by :database

  def actionable?
    actions.present?
  end

  def actions
    []
  end

  def body
    t(".body")
  end

  def emailed?
    record.emailed_at.present?
  end

  def source
    @source ||=
      if params.is_a?(Hash)
        User.find_by(id: params["source_id"])
      elsif params&.params && params.params["source_id"]
        User.find_by(id: params.params["source_id"])
      end
  end

  def source_name
    @source_name =
      if source.nil?
        "Anonymous"
      elsif source.display_name.present?
        source.display_name
      else
        source.username
      end
  end

  def should_deliver_immediate_email?
    unread? && !emailed? && recipient.prefers_immediate_notification?(self.class)
  end

  def title
    t(".title")
  end

  def url
    raise "This method should be redefined on the subclass"
  end
end
