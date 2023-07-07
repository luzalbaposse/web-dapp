require "rails_helper"
require "rake"

RSpec.describe "organizations:create_from_json" do
  include_context "rake"

  let(:json_path) { "spec/fixtures/files/organizations/utrust.json" }
  let(:tag_ids) { "#{tag_one.id}/#{tag_two.id}" }
  let(:tag_one) { create :tag }
  let(:tag_two) { create :tag }
  let(:user_ids) { "#{user_one.id}/#{user_two.id}" }
  let(:user_one) { create :user }
  let(:user_two) { create :user }

  let(:creator_class) { Organizations::Create }
  let(:creator) { instance_double(creator_class, call: organization) }
  let(:organization) { create :team }

  let(:params) do
    {
      "banner_url" => "https://c0.wallpaperflare.com/preview/931/255/701/banner-digital-graphics-lion.jpg",
      "description" => "Leading multi-chain payments technology. Enabling faster, safer & cheaper global transactions. $UTK",
      "location" => "Lisboa, Portugal",
      "logo_url" => "https://cryptogeek.info/upload/content/5f75e7f1385ab.png",
      "name" => "Utrust",
      "tags" => tags,
      "twitter" => "https://twitter.com/utrust",
      "type" => "Organizations::Team",
      "verified" => true,
      "website" => "https://utrust.com/"
    }
  end

  let(:tags) { Tag.where(id: [tag_one.id, tag_two.id]) }
  let(:users) { User.where(id: [user_one.id, user_two.id]) }

  before do
    allow(creator_class).to receive(:new).and_return(creator)
  end

  it "initialises and calls the organizations creator with the correct arguments" do
    subject.invoke(json_path, tag_ids, user_ids)

    aggregate_failures do
      expect(creator_class).to have_received(:new).with(params:, users:, max_invite_uses: nil)
      expect(creator).to have_received(:call)
    end
  end

  context "when the JSON path does not end with '.json'" do
    let(:json_path) { "spec/fixtures/files/organizations/utrust" }

    it "does not initialise the organizations creator" do
      subject.invoke(json_path, tag_ids, user_ids)

      expect(creator_class).not_to have_received(:new)
    end
  end
end
