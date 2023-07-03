require "rails_helper"

RSpec.describe Quests::CompleteVerifyHumanityQuest do
  subject(:complete_verify_humanity_quest) { described_class.new(quest: quest, user: user, params: params).call }

  let(:user) { create :user, humanity_verified_at: humanity_verified_at }
  let!(:talent) { create :talent, user: user }

  let!(:quest) { create :quest, quest_type: quest_type }
  let(:quest_type) { "verify_humanity" }
  let(:params) do
    {}
  end
  let(:humanity_verified_at) { nil }

  let(:refresh_user_quest_class) { Quests::RefreshUserQuest }
  let(:refresh_user_quest_instance) { instance_double(refresh_user_quest_class, call: true) }

  let(:worldcoin_client_class) { Worldcoin::Client }
  let(:worldcoin_client_instance) { instance_double(worldcoin_client_class) }
  let(:worldcoin_response) do
    OpenStruct.new(
      body: worldcoin_response_body.to_json
    )
  end

  let(:worldcoin_response_body) do
    {
      success: true,
      action: "my_action",
      nullifier_hash: "0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8",
      created_at: "2023-02-18T11:20:39.530041+00:00"
    }
  end

  before do
    stub_const("Quests::CompleteVerifyHumanityQuest::WORLDCOIN_QUEST_ACTION", "action")
    allow(refresh_user_quest_class).to receive(:new).and_return(refresh_user_quest_instance)
    allow(worldcoin_client_class).to receive(:new).and_return(worldcoin_client_instance)
    allow(worldcoin_client_instance).to receive(:verify).and_return(worldcoin_response)
  end

  context "when the user was not verified yet" do
    it "initializes and calls the worldcoin client service" do
      complete_verify_humanity_quest

      expect(worldcoin_client_class).to have_received(:new)
      expect(worldcoin_client_instance).to have_received(:verify).with(proof: {
        action: "action",
        signal: "signal-#{user.username}"
      }.to_json)
    end

    context "when the worldcoin verification is successful" do
      it "initializes and calls the refresh user quest service" do
        complete_verify_humanity_quest

        expect(refresh_user_quest_class).to have_received(:new).with(
          user: user,
          quest: quest,
          notify: true
        )
        expect(refresh_user_quest_instance).to have_received(:call)
      end

      it "updates the user flag" do
        freeze_time do
          complete_verify_humanity_quest

          expect(user.reload.humanity_verified_at).to eq Time.current
        end
      end
    end

    context "when the worldcoin verification is unsuccessful" do
      let(:worldcoin_response_body) do
        {
          code: "invalid_proof",
          detail: "The provided proof is invalid and it cannot be verified. Please check all inputs and try again.",
          attribute: nil
        }
      end

      it "raises an error with the correct error message" do
        expect { complete_verify_humanity_quest }.to raise_error(
          described_class::VerificationError,
          "Verification failed with code: invalid_proof. Detail: The provided proof is invalid and it cannot be verified. Please check all inputs and try again."
        )

        expect(refresh_user_quest_class).not_to have_received(:new)
        expect(user.reload.humanity_verified_at).to eq nil
      end
    end
  end

  context "when the was already human verified" do
    let(:humanity_verified_at) { Time.current }

    it "does not initializes the worldcoin client service" do
      complete_verify_humanity_quest

      expect(worldcoin_client_class).not_to have_received(:new)
    end
  end
end
