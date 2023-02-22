require "rails_helper"

RSpec.describe API::Key, type: :model do
  subject { build :api_key }

  describe "validations" do
    it { is_expected.to validate_presence_of(:access_key) }
    it { is_expected.to validate_presence_of(:name) }
  end

  describe "#activate!" do
    let!(:api_key) { create :api_key, name: "test", access_key: SecureRandom.hex, activated_at: activated_at, revoked_at: revoked_at }
    let(:activated_at) { nil }
    let(:revoked_at) { nil }

    it "sets the activated_at to the current time" do
      freeze_time do
        api_key.activate!

        expect(api_key.reload.activated_at.to_s).to eq(Time.current.to_s)
      end
    end

    context "when the api key is already active" do
      let(:activated_at) { Time.current - 1.day }

      it "raises an error" do
        freeze_time do
          expect { api_key.activate! }.to raise_error("Can't activate an already activated key")

          expect(api_key.reload.activated_at.to_s).to eq(activated_at.to_s)
        end
      end
    end

    context "when the api key is revoked" do
      let(:revoked_at) { Time.current - 3.days }

      it "raises an error" do
        freeze_time do
          expect { api_key.activate! }.to raise_error("Can't activate a revoked key")

          expect(api_key.reload.activated_at.to_s).to eq(activated_at.to_s)
        end
      end
    end
  end

  describe "#revoke!" do
    let!(:api_key) { create :api_key, name: "test", access_key: SecureRandom.hex, activated_at: activated_at, revoked_at: revoked_at }
    let(:activated_at) { Time.current }
    let(:revoked_at) { nil }

    it "sets the revoked_at to the current time" do
      freeze_time do
        api_key.revoke!

        expect(api_key.reload.revoked_at).to eq(Time.current)
      end
    end

    context "when the api key is not active" do
      let(:revoked_at) { Time.current - 3.days }
      let(:activated_at) { nil }

      it "raises an error" do
        freeze_time do
          expect { api_key.revoke! }.to raise_error("Can't revoke an inactive key")

          expect(api_key.reload.revoked_at.to_s).to eq(revoked_at.to_s)
        end
      end
    end

    context "when the api key is already revoked" do
      let(:revoked_at) { Time.current - 3.days }

      it "raises an error" do
        freeze_time do
          expect { api_key.revoke! }.to raise_error("Can't revoke an already revoked key")

          expect(api_key.reload.revoked_at.to_s).to eq(revoked_at.to_s)
        end
      end
    end
  end

  describe "#active?" do
    let!(:api_key) { create :api_key, name: "test", access_key: SecureRandom.hex, activated_at: activated_at, revoked_at: revoked_at }
    let(:activated_at) { nil }
    let(:revoked_at) { nil }

    context "when the key was activated" do
      let(:activated_at) { Time.current }

      it "returns true" do
        expect(api_key.active?).to eq(true)
      end
    end

    context "when the key was not activated" do
      it "returns false" do
        expect(api_key.active?).to eq(false)
      end
    end

    context "when the key was revoked" do
      let(:revoked_at) { Time.current }

      it "returns false" do
        expect(api_key.active?).to eq(false)
      end
    end
  end
end
