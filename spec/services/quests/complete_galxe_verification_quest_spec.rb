require "rails_helper"

RSpec.describe Quests::CompleteGalxeVerificationQuest do
  subject(:complete_galxe_verification_quest) { described_class.new(user: user).call }

  let(:user) { create :user, :with_talent }
  let(:user_web3_info) { nil }

  let!(:galxe_verification_quest) { create :quest, quest_type: "galxe_verification" }

  let(:refresh_user_quest_class) { Quests::RefreshUserQuest }
  let(:refresh_user_quest_instance) { instance_double(refresh_user_quest_class, call: true) }

  let(:web3_proxy_class) { Web3Api::ApiProxy }
  let(:web3_proxy) { instance_double(web3_proxy_class) }

  let(:galxe_passport_token_id) { "123456" }
  let(:wallet_nfts_response) do
    [
      {
        "token_address" => described_class::GALXE_PASSPORT_ADDRESS,
        "token_id" => "123456",
        "owner_of" => "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
        "block_number" => "17795113",
        "block_number_minted" => "17795113",
        "token_hash" => "a37b79bffa936cf09a2385506cdfa7b1",
        "amount" => "1",
        "possible_spam" => true,
        "contract_type" => "ERC1155",
        "name" => "OpenSea Shared Storefront",
        "symbol" => "OPENSTORE",
        "token_uri" => "https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x423835a8af395237b8bece37fe63933ab5a103890000000000000a000000000a",
        "metadata" => nil,
        "last_token_uri_sync" => "2023-07-29T00:26:29.439Z",
        "last_metadata_sync" => "2023-07-29T00:26:36.071Z",
        "minter_address" => "ERC1155 tokens don't have a single minter",
        "verified_collection" => false
      },
      {
        "token_address" => "1244",
        "token_id" => "2334",
        "owner_of" => "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
        "block_number" => "16341679",
        "block_number_minted" => "16341679",
        "token_hash" => "bb462aba5da3281a135af8f2b321c760",
        "amount" => "1",
        "possible_spam" => false,
        "contract_type" => "ERC721",
        "name" => "Galxe Passport",
        "symbol" => "Galxe",
        "token_uri" => nil,
        "metadata" => nil,
        "last_token_uri_sync" => "2023-01-05T16:07:29.289Z",
        "last_metadata_sync" => nil,
        "minter_address" => "0x1f9090aae28b8a3dceadf281b0f12828e676c326",
        "verified_collection" => true
      }
    ]
  end

  before do
    allow(refresh_user_quest_class).to receive(:new).and_return(refresh_user_quest_instance)
    allow(web3_proxy_class).to receive(:new).and_return(web3_proxy)
    allow(web3_proxy).to receive(:retrieve_wallet_nfts).and_return(wallet_nfts_response)
  end

  context "when the user was not galxe verified yet" do
    it "initializes and calls the api proxy service" do
      complete_galxe_verification_quest

      expect(web3_proxy_class).to have_received(:new)
      expect(web3_proxy).to have_received(:retrieve_wallet_nfts).with(
        contract_addresses: [described_class::GALXE_PASSPORT_ADDRESS],
        chain: "bsc",
        wallet_address: user.wallet_id
      )
    end

    context "when the user refreshed the web3 data in the last hour" do
      let!(:user_web3_info) { create :user_web3_info, user: user, web3_refreshed_at: Time.current - 30.minutes }

      it "raises an error with the correct error message" do
        freeze_time do
          expect { complete_galxe_verification_quest }.to raise_error(
            described_class::Web3RefreshesExceededError,
            "Web3 refresh attempts exceeded. Try again in the next hour."
          )

          expect(refresh_user_quest_class).not_to have_received(:new)
          user_web3_info = user.reload.user_web3_info
          expect(user_web3_info.galxe_passport_token_id).to eq nil
          expect(user_web3_info.web3_refreshed_at.to_s).to eq((Time.current - 30.minutes).to_s)
        end
      end
    end

    context "when there's a galxe passport" do
      it "initializes and calls the refresh user quest service" do
        complete_galxe_verification_quest

        expect(refresh_user_quest_class).to have_received(:new).with(
          user: user,
          quest: galxe_verification_quest,
          notify: true
        )
        expect(refresh_user_quest_instance).to have_received(:call)
      end

      it "creates the user web3 info" do
        freeze_time do
          expect { complete_galxe_verification_quest }.to change(UserWeb3Info, :count).from(0).to(1)
        end
      end

      it "creates the user web3 info with the correct data" do
        freeze_time do
          complete_galxe_verification_quest

          user_web3_info = user.user_web3_info.reload
          expect(user_web3_info.galxe_passport_token_id).to eq galxe_passport_token_id
          expect(user_web3_info.web3_refreshed_at).to eq Time.current
        end
      end

      it "updates the talent flag" do
        freeze_time do
          complete_galxe_verification_quest

          expect(user.reload.talent.verified).to be true
        end
      end
    end

    context "when there's no galxe passport" do
      let(:wallet_nfts_response) { [] }

      it "raises an error with the correct error message" do
        freeze_time do
          expect { complete_galxe_verification_quest }.to raise_error(
            described_class::VerificationError,
            "Verification failed. Reason: Wallet #{user.wallet_id} does not have a galxe passport associated."
          )

          expect(refresh_user_quest_class).not_to have_received(:new)
          user_web3_info = user.reload.user_web3_info
          expect(user_web3_info.galxe_passport_token_id).to eq nil
          expect(user_web3_info.web3_refreshed_at).to eq Time.current
        end
      end
    end
  end

  context "when the user was already galxe verified" do
    let!(:user_web3_info) { create :user_web3_info, user: user, galxe_passport_token_id: "12345" }

    it "does not initializes the refresh user quest service" do
      complete_galxe_verification_quest

      expect(refresh_user_quest_class).not_to have_received(:new)
    end

    it "does not initializes the api proxy client service" do
      complete_galxe_verification_quest

      expect(web3_proxy_class).not_to have_received(:new)
    end
  end
end
