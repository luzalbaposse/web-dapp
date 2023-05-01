require "rails_helper"

RSpec.describe Web3::WhitelistTalentMate do
  subject(:whitelist_talent_mate) { described_class.new.call(user: user, level: level) }

  let(:user) { create :user, whitelisted_talent_mate: false }
  let(:level) { "talent_token" }

  let(:lambda_class) { Aws::Lambda::Client }
  let(:lambda_client) { instance_double(lambda_class) }

  let(:lambda_response) do
    OpenStruct.new(
      payload: OpenStruct.new(
        string: lambda_response_json.to_json
      )
    )
  end

  let(:lambda_response_json) do
    {
      statusCode: 200
    }
  end

  before do
    allow(lambda_class).to receive(:new).and_return(lambda_client)
    allow(lambda_client).to receive(:invoke).and_return(lambda_response)
    allow(Rollbar).to receive(:warning)
    allow(Rollbar).to receive(:error)
  end

  let(:address) { SecureRandom.hex }

  it "initializes the lambda client" do
    whitelist_talent_mate

    expect(lambda_class).to have_received(:new).with(
      region: "eu-west-2"
    )
  end

  context "when the lambda response is successful" do
    it "returns true" do
      expect(whitelist_talent_mate).to eq true
    end

    it "updates the user whitelist flag" do
      whitelist_talent_mate

      expect(user.reload.whitelisted_talent_mate).to eq true
    end
  end

  context "when the lambda response is unsuccessful" do
    let(:lambda_response_json) do
      {
        "statusCode" => 400
      }
    end

    it "returns false" do
      expect(whitelist_talent_mate).to eq false
    end

    it "does not update the user whitelist flag" do
      whitelist_talent_mate

      expect(user.reload.whitelisted_talent_mate).to eq false
    end

    it "raises the warning to Rollbar" do
      whitelist_talent_mate

      expect(Rollbar).to have_received(:warning).with(
        "Unable to whitelist user ##{user.id}", response: lambda_response_json
      )
    end

    context "when the response code is 500" do
      let(:lambda_response_json) do
        {
          "statusCode" => 500
        }
      end

      it "raises the error to Rollbar" do
        whitelist_talent_mate

        expect(Rollbar).to have_received(:error).with(
          "Unable to whitelist user ##{user.id}", response: lambda_response_json
        )
      end
    end
  end
end
