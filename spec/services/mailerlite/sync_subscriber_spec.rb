require "rails_helper"

RSpec.describe Mailerlite::SyncSubscriber do
  subject(:sync_subscriber) { described_class.new.call(user) }

  let(:user) { create :user, :with_talent }

  let(:search_request) { "https://api.mailerlite.com/api/v2/subscribers/search?query=#{user.email}" }
  let(:search_request_response) do
    {
      status: search_request_status,
      body: [
        {
          content: "mock"
        }
      ].to_json
    }
  end
  let(:search_request_status) { 200 }

  let(:add_subscriber_request) { "https://api.mailerlite.com/api/v2/subscribers" }
  let(:update_subscriber_request) { "https://api.mailerlite.com/api/v2/subscribers/#{user.email}" }

  before do
    stub_request(:get, search_request).to_return(search_request_response)
    stub_request(:post, add_subscriber_request)
    stub_request(:put, update_subscriber_request)
  end

  it "makes a request to the subscriber" do
    sync_subscriber

    expect(
      a_request(:get, search_request)
    )
      .to have_been_made
      .once
  end

  context "when the search request is successful" do
    let(:search_request_status) { 200 }

    context "when the search result is not empty" do
      it "makes a request to update the subscriber" do
        sync_subscriber

        expect(
          a_request(:put, update_subscriber_request)
        )
          .to have_been_made
          .once
      end
    end

    context "when the search result is empty" do
      let(:search_request_response) do
        {
          status: search_request_status,
          body: [].to_json
        }
      end

      it "makes a request to the create subscriber" do
        sync_subscriber

        expect(
          a_request(:post, add_subscriber_request)
        )
          .to have_been_made
          .once
      end
    end
  end

  context "when the search request is unsuccessful" do
    let(:search_request_status) { 409 }

    it "raises an error" do
      expect { sync_subscriber }.to raise_error("Error syncing with mailerlite. Probably exceeded rate limit")
    end
  end
end
