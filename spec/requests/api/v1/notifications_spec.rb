require "rails_helper"

RSpec.describe "Notifications", type: :request do
  let(:current_user) { create :user }

  let!(:notification_one) { create :notification, recipient: current_user, type: "MessageReceivedNotification" }
  let!(:notification_two) { create :notification, recipient: current_user, type: "QuestCompletedNotification" }
  let!(:notification_three) { create :notification, type: "TokenAcquiredNotification" }
  let!(:notification_four) { create :notification, recipient: current_user, type: "TokenAcquiredNotification" }

  describe "#index" do
    subject(:get_notifications) { get api_v1_notifications_path(as: current_user) }

    it "returns a successful response" do
      get_notifications

      expect(response).to have_http_status(:ok)
    end

    it "returns the in app notifications of the user" do
      get_notifications

      expect(json[:notifications].map(&:with_indifferent_access)).to match_array(
        NotificationBlueprint.render_as_json([notification_one, notification_four], view: :normal)
      )
    end

    it "returns pagination data" do
      get_notifications

      expect(json[:pagination]).to eq(
        {
          currentPage: 1,
          lastPage: 1
        }
      )
    end
  end

  describe "#mark_all_as_read" do
    subject(:mark_all_as_read) { post api_v1_clear_notifications_path(as: current_user) }

    before { notification_one.update(read_at: Date.yesterday) }

    it "returns a successful response" do
      mark_all_as_read

      expect(response).to have_http_status(:ok)
    end

    it "marks all user notifications as read" do
      freeze_time do
        mark_all_as_read

        aggregate_failures do
          expect(notification_one.reload.read_at).to eq(Date.yesterday)
          expect(notification_two.reload.read_at).to eq(Time.now)
          expect(notification_three.reload.read_at).to be_nil
          expect(notification_four.reload.read_at).to eq(Time.now)
        end
      end
    end
  end

  describe "#mark_as_read" do
    subject(:mark_as_read) { put api_v1_notification_mark_as_read_path(notification_id: notification_one.id, as: current_user) }

    it "returns a successful response" do
      mark_as_read

      expect(response).to have_http_status(:ok)
    end

    it "marks the notification as read" do
      freeze_time do
        mark_as_read

        aggregate_failures do
          expect(notification_one.reload.read_at).to eq(Time.now)
        end
      end
    end
  end
end
