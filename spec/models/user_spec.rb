require "rails_helper"

RSpec.describe User, type: :model do
  subject(:user) { build :user }

  describe "associations" do
    it { is_expected.to have_one(:talent) }
    it { is_expected.to have_one(:user_email_log) }

    # Chat
    it { is_expected.to have_many(:messagee) }
    it { is_expected.to have_many(:senders).through(:messagee) }
    it { is_expected.to have_many(:messaged) }
    it { is_expected.to have_many(:receivers).through(:messaged) }

    # Feed
    it { is_expected.to have_many(:subscriptions) }
    it { is_expected.to have_many(:subscribers).through(:active_subscriptions) }
    it { is_expected.to have_many(:subscribing) }
    it { is_expected.to have_many(:users_subscribing) }
    it { is_expected.to have_many(:pending_subscriptions) }
    it { is_expected.to have_many(:connections) }
    it { is_expected.to have_many(:goals) }
  end

  describe "validations" do
    it { is_expected.to validate_numericality_of(:profile_completeness).is_less_than_or_equal_to(1) }
  end

  describe "email_and_credentials validation" do
    context "when the user does not have an email" do
      it "raises a RecordInvalid error" do
        expect { create :user, email: "" }
          .to raise_error(
            ActiveRecord::RecordInvalid,
            "Validation failed: The user doesn't respect the required login requirements"
          )
      end
    end

    context "when the user has an email" do
      context "when the user has a password but no LinkedIn id" do
        it "does not raise an error" do
          expect { create :user, linkedin_id: nil }.not_to raise_error
        end
      end

      context "when the user has a LinkedIn id but no password" do
        it "does not raise an error" do
          expect { create :user, linkedin_id: "user_132298", password: nil }.not_to raise_error
        end
      end

      context "when the user does not have a password or LinkedIn id" do
        it "raises a RecordInvalid error" do
          expect { create :user, linkedin_id: nil, password: nil }
            .to raise_error(
              ActiveRecord::RecordInvalid,
              "Validation failed: The user doesn't respect the required login requirements"
            )
        end
      end
    end
  end

  describe "uniqueness validation" do
    it "does not allow multiple users with same email" do
      create(:user, email: "john.doe@talentprotocol.com")

      expect {
        create(:user, email: "john.doe@talentprotocol.com")
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "does not allow multiple users with same username" do
      create(:user, username: "frank")

      expect {
        create(:user, username: "frank")
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "does not allow multiple users with same wallet_id" do
      create(:user, wallet_id: "1")

      expect {
        create(:user, wallet_id: "1")
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "does not allow multiple users with the same humanity_proof" do
      create(:user, humanity_proof: "1")

      expect {
        create(:user, humanity_proof: "1")
      }.to raise_error(ActiveRecord::RecordInvalid)
    end

    it "does not allow non supported roles" do
      expect {
        create(:user, role: "Investor")
      }.to raise_error(ActiveRecord::RecordInvalid).with_message(/The role Investor isn't supported./)
    end
  end

  describe "scopes" do
    describe ".members" do
      let(:user_one) { create :user, last_access_at: Date.today, created_at: Date.yesterday }
      let(:user_two) { create :user, last_access_at: Date.yesterday, created_at: Date.yesterday }
      let(:user_three) { create :user, last_access_at: Date.today - 10.days, created_at: Date.today - 10.days }
      let(:user_four) { create :user, last_access_at: Date.today, created_at: Date.today - 10.days }

      it "only returns members" do
        expect(User.members).to match_array([user_one, user_four])
      end
    end
  end

  describe "helper methods" do
    it "calculates the correct chat id" do
      user1 = create(:user, wallet_id: "0", username: "0")
      user2 = create(:user, wallet_id: "1", username: "1")

      expect(user1.sender_chat_id(user2)).to eq(user1.id.to_s + user2.id.to_s)
      expect(user1.receiver_chat_id(user2)).to eq(user1.id.to_s + user2.id.to_s)
    end

    it "calculates the correct last message sent between two users" do
      user1 = create(:user, wallet_id: "0", username: "0")
      user2 = create(:user, wallet_id: "1", username: "1")
      create(:message, sender: user1, receiver: user2, text: "Hello!")
      create(:message, sender: user1, receiver: user2, text: "Bye!")

      expect(user1.last_message_with(user2).text).to eq("Bye!")
    end

    it "checks if user has unread messages" do
      user1 = build(:user, email: "a@m.com")
      user2 = build(:user, email: "b@m.com")
      create(:message, sender: user1, receiver: user2, text: "Hello!",
        is_read: true)
      create(:message, sender: user2, receiver: user1, text: "Hello!",
        is_read: false)
      create(:message, sender: user2, receiver: user1, text: "Bye!", is_read:
             false)

      expect(user1.has_unread_messages?).to be_truthy
      expect(user2.has_unread_messages?).to be_falsey
    end
  end

  describe "#admin_or_moderator?" do
    let(:user) { create :user, role: role }

    context "when the user's role is 'admin'" do
      let(:role) { "admin" }

      it "returns false" do
        expect(user.admin_or_moderator?).to be_truthy
      end
    end

    context "when the user's role is 'basic'" do
      let(:role) { "basic" }

      it "returns false" do
        expect(user.admin_or_moderator?).to be_falsey
      end
    end

    context "when the user's role is 'moderator'" do
      let(:role) { "moderator" }

      it "returns true" do
        expect(user.admin_or_moderator?).to be_truthy
      end
    end
  end

  describe "#amount_invested_in" do
    let(:user) { create :user }

    let(:other_user) { create :user, talent: talent }
    let(:talent) { create :talent }
    let(:talent_token) { create :talent_token, talent: talent, deployed: true }

    context "when the user does not have an investment in the other user" do
      it "returns 0" do
        expect(user.amount_invested_in(other_user)).to eq 0
      end
    end

    context "when the user has an investment in the other user" do
      before do
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: talent_token.contract_id, amount: "1000000"
      end

      it "returns the amount invested by the user" do
        expect(user.amount_invested_in(other_user)).to eq 1000000
      end
    end
  end

  describe "#approved_by" do
    let(:user) { create :user, profile_type: profile_type }
    let(:who_dunnit) { create :user, role: "admin" }

    context "when the user's profile type is 'approved'" do
      let(:profile_type) { "approved" }

      context "when there is a profile type change log for the change" do
        before do
          UserProfileTypeChange.create!(
            previous_profile_type: "waiting_for_approval",
            new_profile_type: "approved",
            user: user,
            who_dunnit: who_dunnit
          )
        end

        it "returns the user who approved it" do
          expect(user.approved_by).to eq(who_dunnit)
        end
      end

      context "when there is not a profile type change log for the change" do
        before do
          UserProfileTypeChange.create!(
            previous_profile_type: "supporter",
            new_profile_type: "talent",
            user: user,
            who_dunnit: who_dunnit
          )
        end

        it "returns nil" do
          expect(user.approved_by).to be_nil
        end
      end
    end

    context "when the user's profile type is not 'approved'" do
      let(:profile_type) { "rejected" }

      it "returns nil" do
        expect(user.approved_by).to be_nil
      end
    end
  end

  describe "#display_wallet_id?" do
    let(:user) { create :user, wallet_id: "0x123456789101234567890" }

    context "when a user domain is associated with the user" do
      before do
        create :user_domain, domain: "dinis.blockchain", user: user
      end

      it "returns the domain" do
        expect(user.display_wallet_id).to eq("dinis.blockchain")
      end
    end

    context "when a user domain is not associated with the user" do
      it "shortens the wallet id for displaying" do
        expect(user.display_wallet_id).to eq("0x123456789...")
      end
    end
  end

  describe "#onboarding_complete?" do
    let(:user) { create :user, onboarded_at: onboarded_at }

    context "when the onboarded_at is nil" do
      let(:onboarded_at) { nil }

      it "returns false" do
        expect(user.onboarding_complete?).to eq false
      end
    end

    context "when the onboarded_at is not nil" do
      let(:onboarded_at) { Time.current }

      it "returns true" do
        expect(user.onboarding_complete?).to eq true
      end
    end
  end

  describe "#supporters" do
    let(:user) { create :user, talent: talent }
    let(:talent) { create :talent }
    let(:talent_token) { create :talent_token, talent: talent, deployed: true }

    context "when the user does not have any supporter" do
      it "returns an empty array" do
        expect(user.supporters).to be_empty
      end
    end

    context "when the user has some supporters" do
      let(:supporter_one) { create :user }
      let(:supporter_two) { create :user }
      let(:supporter_three) { create :user }

      before do
        create :talent_supporter, supporter_wallet_id: supporter_one.wallet_id, talent_contract_id: talent_token.contract_id, last_time_bought_at: Date.today - 10.days
        create :talent_supporter, supporter_wallet_id: supporter_two.wallet_id, talent_contract_id: talent_token.contract_id, last_time_bought_at: Date.today - 5.days
        create :talent_supporter, supporter_wallet_id: supporter_three.wallet_id, talent_contract_id: SecureRandom.hex, last_time_bought_at: Date.today - 2.days
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: talent_token.contract_id, last_time_bought_at: Date.today
      end

      it "returns the users that support him" do
        expect(user.supporters).to match_array([user, supporter_one, supporter_two])
      end

      context "when including_self is passed as false" do
        it "returns the users that support him expect himself" do
          expect(user.supporters(including_self: false)).to match_array([supporter_one, supporter_two])
        end
      end

      context "when invested_after is passed" do
        let(:date) { Date.today - 6.days }

        it "returns the supporters that invested in the talent after that date" do
          expect(user.supporters(invested_after: date)).to match_array([supporter_two, user])
        end
      end
    end
  end

  describe "#portfolio" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:talent) { create :talent, user: user }
    let!(:talent_token) { create :talent_token, talent: talent }
    let(:wallet_id) { SecureRandom.hex }

    context "when the user does not have any investor" do
      it "returns an empty array" do
        expect(user.portfolio).to be_empty
      end
    end

    context "when the user does not have the wallet connected" do
      let(:wallet_id) { nil }

      it "returns an empty array" do
        expect(user.portfolio).to be_empty
      end
    end

    context "when the user has some investments" do
      let(:talent_user_one) { create :user }
      let(:talent_one) { create :talent, user: talent_user_one }
      let!(:talent_token_one) { create :talent_token, talent: talent_one }

      let(:talent_user_two) { create :user }
      let!(:talent_two) { create :talent, user: talent_user_two }
      let!(:talent_token_two) { create :talent_token, talent: talent_two }

      let(:talent_user_three) { create :user }
      let!(:talent_three) { create :talent, user: talent_user_three }
      let!(:talent_token_three) { create :talent_token, talent: talent_three }

      before do
        create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: talent_token_one.contract_id, last_time_bought_at: Date.today - 10.days
        create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: talent_token_two.contract_id, last_time_bought_at: Date.today - 5.days
        create :talent_supporter, supporter_wallet_id: SecureRandom.hex, talent_contract_id: talent_token_three, last_time_bought_at: Date.today - 2.days
        create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: talent_token.contract_id, last_time_bought_at: Date.today
      end

      it "returns the users in which the user invested" do
        expect(user.portfolio).to match_array([user, talent_user_one, talent_user_two])
      end

      context "when including_self is passed as false" do
        it "returns the users that support him expect himself" do
          expect(user.portfolio(including_self: false)).to match_array([talent_user_one, talent_user_two])
        end
      end

      context "when invested_after is passed" do
        let(:date) { Date.today - 6.days }

        it "returns the portfolio that invested in the talent after that date" do
          expect(user.portfolio(invested_after: date)).to match_array([talent_user_two, user])
        end
      end
    end
  end

  describe "#connected_with_since" do
    let(:user) { create :user }

    let(:other_user) { create :user, talent: talent }
    let(:talent) { create :talent }
    let(:talent_token) { create :talent_token, talent: talent, deployed: true }

    context "when the user is only subscribing the other user" do
      before do
        create :subscription, user: other_user, subscriber: user, created_at: Date.yesterday
      end

      it "returns the date of the subscribe" do
        expect(user.connected_with_since(other_user)).to eq Date.yesterday
      end
    end

    context "when the user is only invested in the other user" do
      before do
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: talent_token.contract_id, first_time_bought_at: Date.today - 10.days
      end

      it "returns the date of the first investment" do
        expect(user.connected_with_since(other_user)).to eq Date.today - 10.days
      end
    end

    context "when the user is sponsoring the other user" do
      before do
        create :sponsorship, sponsor: user.wallet_id, talent: other_user.wallet_id, claimed_at: Date.today - 3.days
        create :sponsorship, sponsor: user.wallet_id, talent: other_user.wallet_id, claimed_at: Date.today - 4.days
      end

      it "returns the date of the first claimed sponsorship" do
        expect(user.connected_with_since(other_user)).to eq Date.today - 4.days
      end
    end

    context "when the other user is sponsoring user" do
      before do
        create :sponsorship, sponsor: other_user.wallet_id, talent: user.wallet_id, claimed_at: Date.today - 3.days
        create :sponsorship, sponsor: other_user.wallet_id, talent: user.wallet_id, claimed_at: Date.today - 5.days
      end

      it "returns the date of the first claimed sponsorship" do
        expect(user.connected_with_since(other_user)).to eq Date.today - 5.days
      end
    end

    context "when the user is invested in and is subscribing the other user" do
      before do
        create :subscription, user: other_user, subscriber: user, created_at: Date.yesterday
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: talent_token.contract_id, first_time_bought_at: Date.today - 10.days
      end

      it "returns the date the oldest date" do
        expect(user.connected_with_since(other_user)).to eq Date.today - 10.days
      end
    end
  end

  describe "#valid_delete_account_token?" do
    let(:user) { create :user, delete_account_token: token, delete_account_token_expires_at: expires_at }
    let(:expires_at) { Time.now + 1.hour }
    let(:token) { "token" }

    it "returns true" do
      expect(user.valid_delete_account_token?("token"))
    end

    context "when the tokens do not match" do
      it "returns false" do
        expect(user.valid_delete_account_token?("invalid-token"))
      end
    end

    context "when the token has expired" do
      let(:expires_at) { Time.now - 1.hour }

      it "returns false" do
        expect(user.valid_delete_account_token?("token"))
      end
    end

    context "when the user does not have a delete account token and expiry" do
      let(:expires_at) { nil }
      let(:token) { nil }

      it "returns false" do
        expect(user.valid_delete_account_token?("token"))
      end
    end
  end

  describe "#moderator?" do
    let(:user) { create :user, role: role }

    context "when the user's role is 'admin'" do
      let(:role) { "admin" }

      it "returns false" do
        expect(user.moderator?).to be_falsey
      end
    end

    context "when the user's role is 'basic'" do
      let(:role) { "basic" }

      it "returns false" do
        expect(user.moderator?).to be_falsey
      end
    end

    context "when the user's role is 'moderator'" do
      let(:role) { "moderator" }

      it "returns true" do
        expect(user.moderator?).to be_truthy
      end
    end
  end

  describe "#subscriber_of?" do
    let(:subscriber) { create :user }
    let(:user) { create :user }

    context "when the subscriber is not subscribing the user" do
      it "returns false" do
        expect(subscriber.subscriber_of?(user)).to be_falsey
      end
    end

    context "when the subscriber has a pending subscription with the user" do
      before do
        create :pending_subscription, user: user, subscriber: subscriber
      end

      it "returns false" do
        expect(subscriber.subscriber_of?(user)).to eq false
      end
    end

    context "when the subscriber has an active subscription with the user" do
      before do
        create :subscription, user: user, subscriber: subscriber
      end

      it "returns true" do
        expect(subscriber.subscriber_of?(user)).to eq true
      end
    end
  end

  describe "#user_domain" do
    let(:user) { create :user }

    context "when the user does not have any domain" do
      it "returns nil" do
        expect(user.user_domain).to eq nil
      end
    end

    context "when the user has a tal domain" do
      let!(:tal_domain) { create :user_domain, user: user, domain: "dinis.tal.community", chain_id: 1, tal_domain: true, provider: "ens" }
      let!(:another_domain) { create :user_domain, user: user, domain: "dinis.wallet", chain_id: 137, tal_domain: false, provider: "unstoppable_domains" }

      it "returns the tal domain" do
        expect(user.user_domain).to eq tal_domain
      end
    end
  end

  describe "#pending_network_requests?" do
    let(:user) { create :user }

    context "when there are pending subscriptions" do
      before do
        create :pending_subscription, user: user, subscriber: create(:user)
      end

      it "returns true" do
        expect(user.pending_network_requests?).to eq true
      end
    end

    context "when there are pending sponsorships" do
      before do
        create :sponsorship, talent: user.wallet_id, sponsor: SecureRandom.hex
      end

      it "returns true" do
        expect(user.pending_network_requests?).to eq true
      end
    end

    context "when there are no pending subscriptions or sponsorships" do
      it "returns false" do
        expect(user.pending_network_requests?).to eq false
      end
    end
  end

  describe "#pending_subscribers" do
    let(:user_1) { create :user }
    let(:user_2) { create :user }
    let(:user_3) { create :user }

    before do
      create :pending_subscription, user: user_1, subscriber: user_2
      create :subscription, user: user_1, subscriber: user_3
      create :pending_subscription, user: user_2, subscriber: user_3
    end

    it "only returns users pending a subscription" do
      expect(user_1.pending_subscribers).to eq [user_2]
    end
  end

  describe "#profile_completeness" do
    let(:user) { create :user, display_name: display_name }
    let!(:talent) { create :talent, user: user }
    let(:display_name) { "Test Talent" }

    context "when all fields are present" do
      before do
        talent.occupation = "Tester"
        talent.headline = "Great tester with lots of experience"
        talent.website = "my_website.com"
        talent.verified = true
        talent.save!

        create :milestone, talent: talent
        career_goal = create :career_goal, talent: talent
        create :goal, career_goal: career_goal, due_date: Date.tomorrow

        tag = create :tag, description: "web3", hidden: false
        user.tags << tag

        allow_any_instance_of(User).to receive(:profile_picture_url).and_return("https://path_to_image")
      end

      it "returns an empty array" do
        expect(user.missing_profile_fields).to eq []
      end

      it "returns true for profile completeness" do
        expect(user.profile_completed?).to eq true
      end

      it "returns true for profile completed quest" do
        expect(user.profile_complete_quest_completed?).to eq true
      end

      it "returns the correct completeness" do
        user.upsert_profile_completeness!

        expect(user.reload.profile_completeness).to eq 1
      end
    end

    context "when some fields are missing" do
      it "returns the missing fields" do
        expect(user.missing_profile_fields).to eq ["profile_picture", "occupation", "headline", "career_goal", "milestone", "tag", "social_link", "verified"]
      end

      it "returns false for profile completeness" do
        expect(user.profile_completed?).to eq false
      end

      it "returns false for profile completed quest" do
        expect(user.profile_complete_quest_completed?).to eq false
      end

      it "returns the correct completeness" do
        user.upsert_profile_completeness!

        required_fields_count = User::REQUIRED_PROFILE_FIELDS.count + 1

        expect(user.reload.profile_completeness).to eq(2.to_f / required_fields_count)
      end
    end
  end

  describe "#sponsors" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:wallet_id) { SecureRandom.hex }

    let!(:sponsorship_one) { create :sponsorship, talent: wallet_id }
    let!(:sponsorship_two) { create :sponsorship, sponsor: wallet_id }
    let!(:sponsorship_three) { create :sponsorship, talent: wallet_id }

    it "returns sponsorships where the user acted as a receiver" do
      expect(user.sponsors).to match_array([sponsorship_one, sponsorship_three])
    end
  end

  describe "#claimed_sponsors" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:wallet_id) { SecureRandom.hex }

    let!(:sponsorship_one) { create :sponsorship, talent: wallet_id, claimed_at: Date.today }
    let!(:sponsorship_two) { create :sponsorship, sponsor: wallet_id }
    let!(:sponsorship_three) { create :sponsorship, talent: wallet_id }

    it "returns sponsorships where the user acted as a receiver and it's already clamied" do
      expect(user.claimed_sponsors).to match_array([sponsorship_one])
    end
  end

  describe "#sponsorships" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:wallet_id) { SecureRandom.hex }

    let!(:sponsorship_one) { create :sponsorship, sponsor: wallet_id }
    let!(:sponsorship_two) { create :sponsorship, talent: wallet_id }
    let!(:sponsorship_three) { create :sponsorship, sponsor: wallet_id }

    it "returns sponsorships where the user acted as a receiver" do
      expect(user.sponsorships).to match_array([sponsorship_one, sponsorship_three])
    end
  end

  describe "#tal_amount_invested" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:wallet_id) { SecureRandom.hex }

    before do
      create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: SecureRandom.hex, tal_amount: "1000000000"
      create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: SecureRandom.hex, tal_amount: "2000000000"
    end

    it "returns the sum of tal amount invested" do
      expect(user.tal_amount_invested).to eq 3000000000
    end
  end

  describe "#usd_amount_invested" do
    let(:user) { create :user, wallet_id: wallet_id }
    let(:wallet_id) { SecureRandom.hex }

    before do
      create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: SecureRandom.hex, tal_amount: "10000000000000"
      create :talent_supporter, supporter_wallet_id: wallet_id, talent_contract_id: SecureRandom.hex, tal_amount: "20000000000000"
    end

    it "returns the sum of usd amount invested" do
      expect(user.usd_amount_invested).to eq((30000000000000 * TalentToken::TAL_VALUE_IN_USD / TalentToken::TAL_DECIMALS))
    end
  end

  describe "#aggregate_*_count" do
    let(:user) { create :user, wallet_id: SecureRandom.hex }
    let(:connected_user1) { create :user, wallet_id: SecureRandom.hex }
    let(:connected_user2) { create :user, wallet_id: SecureRandom.hex }
    let(:connected_user3) { create :user, wallet_id: SecureRandom.hex }
    let(:connected_user4) { create :user, wallet_id: SecureRandom.hex }

    before do
      create :connection, user: user, connected_user: connected_user1, connection_type: "staker"
      create :connection, user: user, connected_user: connected_user2, connection_type: "subscribing"
      create :connection, user: user, connected_user: connected_user3, connection_type: "sponsored"
      create :connection, user: user, connected_user: connected_user4, connection_type: "subscriber"
    end

    context "aggregate_supporters_count" do
      it "returns the count of all the supporters" do
        expect(user.aggregate_supporters_count).to eq(3)
      end
    end

    context "aggregate_supporting_count" do
      it "returns the count of all the supporting" do
        expect(user.aggregate_supporting_count).to eq(1)
      end
    end
  end

  describe "tal_balance?" do
    context "when the user has purchased tokens" do
      before { user.update(tokens_purchased: true) }

      it "returns true" do
        expect(user.tal_balance?).to eq(true)
      end
    end

    context "when the user has TAL wallet activities" do
      before { create :wallet_activity, symbol: "TAL", user: }

      it "returns true" do
        expect(user.tal_balance?).to eq(true)
      end
    end

    context "when the user has not purchased tokens and no TAL wallet activities" do
      it "returns false" do
        expect(user.tal_balance?).to eq(false)
      end
    end
  end
end
