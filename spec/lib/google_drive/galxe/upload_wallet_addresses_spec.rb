require "google_drive/galxe/upload_wallet_addresses"
require "rails_helper"

RSpec.describe GoogleDrive::Galxe::UploadWalletAddresses do
  let(:user_one) { create :user, :with_talent, wallet_id: "123" }
  let(:career_goal) { create :career_goal, talent: user_one.talent }
  let!(:goal) { create :goal, career_goal:, progress: Goal::DOING }

  let(:user_two) { create :user, :with_talent, wallet_id: "abc" }
  let!(:subscriptions) { create_list :subscription, 4, subscriber: user_two }

  let(:google_drive_session_class) { GoogleDrive::Session }
  let(:google_drive_session) { instance_double(google_drive_session_class) }

  let(:google_drive_spreadsheet_class) { GoogleDrive::Spreadsheet }

  let(:google_drive_career_goal_spreadsheet) do
    instance_double(google_drive_spreadsheet_class, worksheets: [google_drive_career_goal_worksheet])
  end

  let(:google_drive_subscription_spreadsheet) do
    instance_double(google_drive_spreadsheet_class, worksheets: [google_drive_subscription_worksheet])
  end

  let(:google_drive_worksheet_class) { GoogleDrive::Worksheet }

  let(:google_drive_career_goal_worksheet) do
    instance_double(google_drive_worksheet_class, num_rows: 3, rows: [[]], save: true)
  end

  let(:google_drive_subscription_worksheet) do
    instance_double(google_drive_worksheet_class, num_rows: 10, rows: [[]], save: true)
  end

  before do
    ENV["GOOGLE_SERVICE_ACCOUNT_JSON"] = {}.to_json

    allow(google_drive_session_class)
      .to receive(:from_service_account_key)
      .and_return(google_drive_session)

    allow(google_drive_session)
      .to receive(:spreadsheet_by_key)
      .with(described_class::CAREER_GOAL_SHEET_ID)
      .and_return(google_drive_career_goal_spreadsheet)

    allow(google_drive_session)
      .to receive(:spreadsheet_by_key)
      .with(described_class::SUBSCRIPTION_SHEET_ID)
      .and_return(google_drive_subscription_spreadsheet)

    allow(google_drive_career_goal_worksheet).to receive(:[]=)
    allow(google_drive_subscription_worksheet).to receive(:[]=)
  end

  subject { described_class.new }

  describe "#call" do
    it "initializes a Google Drive session" do
      subject.call

      expect(google_drive_session_class).to have_received(:from_service_account_key)
    end

    it "fetches the career goals spreadsheet" do
      subject.call

      expect(google_drive_session)
        .to have_received(:spreadsheet_by_key)
        .with(described_class::CAREER_GOAL_SHEET_ID)
    end

    it "fetches the subscriptions spreadsheet" do
      subject.call

      expect(google_drive_session)
        .to have_received(:spreadsheet_by_key)
        .with(described_class::CAREER_GOAL_SHEET_ID)
    end

    it "inserts wallet addresses and saves the career goal worksheet" do
      subject.call

      expect(google_drive_career_goal_worksheet).to have_received(:[]=).with(4, 1, "123")
      expect(google_drive_career_goal_worksheet).to have_received(:save)
    end

    it "inserts wallet addresses and saves the subscription worksheet" do
      subject.call

      expect(google_drive_subscription_worksheet).to have_received(:[]=).with(11, 1, "abc")
      expect(google_drive_subscription_worksheet).to have_received(:save)
    end
  end
end
