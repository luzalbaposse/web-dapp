require "rails_helper"

RSpec.describe Talents::RefreshSupporters do
  let(:talent_user) { create :user }
  let(:talent_token) { create :talent_token, talent: talent, chain_id: 42220, deployed: true }
  let(:talent) { create :talent, user: talent_user }
  let(:talent_contract_id) { talent_token.contract_id }

  let!(:supporter_one) { create :user, wallet_id: "99asn" }
  let!(:supporter_two) { create :user, wallet_id: "01ksh" }

  subject(:refresh_supporters) { described_class.new(talent_token: talent_token).call }

  let(:the_graph_client_class) { TheGraph::Celo::Client }
  let(:the_graph_client_instance) { instance_double(the_graph_client_class) }

  let(:talent_supporters_data) do
    OpenStruct.new(talent_token: talent_token_data)
  end

  let(:talent_token_data) do
    OpenStruct.new(
      supporter_counter: supporter_counter,
      total_supply: "183000000000000000000",
      supporters: supporters_data,
      token_day_data: token_day_data
    )
  end

  let(:supporter_counter) { "2" }

  let(:supporters_data) do
    [
      OpenStruct.new(
        id: SecureRandom.hex,
        supporter: OpenStruct.new(id: "99asn"),
        amount: "60000000000000000000",
        tal_amount: "300000000000000000000",
        last_time_bought_at: "1657727823",
        first_time_bought_at: "1627727823"
      ),
      OpenStruct.new(
        id: SecureRandom.hex,
        supporter: OpenStruct.new(id: "01ksh"),
        amount: "90000000000000000000",
        tal_amount: "450000000000000000000",
        last_time_bought_at: "1657564775",
        first_time_bought_at: "1627564775"
      )
    ]
  end

  # results will always be sorted asc
  # check: lib/the_graph/queries.rb
  let(:token_day_data) do
    [
      OpenStruct.new(
        id: SecureRandom.hex,
        date: (Date.today - 15.days).to_time.to_i,
        daily_supply: "180000000000000000000"
      ),
      OpenStruct.new(
        id: SecureRandom.hex,
        date: Date.yesterday.to_time.to_i,
        daily_supply: "900000000000000000000"
      )
    ]
  end

  before do
    allow(the_graph_client_class).to receive(:new).and_return(the_graph_client_instance)
    allow(the_graph_client_instance).to receive(:talent_supporters).and_return(talent_supporters_data)
  end

  it "initializes the graph client once" do
    refresh_supporters

    expect(the_graph_client_class).to have_received(:new).once
  end

  it "requests the talent supporters once" do
    refresh_supporters

    expect(the_graph_client_instance).to have_received(:talent_supporters).once
  end

  it "creates 2 talent supporter records" do
    expect { refresh_supporters }.to change(TalentSupporter, :count).from(0).to(2)
  end

  it "creates 2 connection records" do
    expect { refresh_supporters }.to change(Connection, :count).from(0).to(4)
  end

  it "updates the talent information with the correct data" do
    refresh_supporters

    talent.reload

    variance = (("183000000000000000000".to_f - "180000000000000000000".to_f) * 100 / "180000000000000000000".to_f).round(2)

    aggregate_failures do
      expect(talent.total_supply).to eq "183000000000000000000"
      expect(talent.market_cap).to eq ("183000000000000000000".to_f * TalentToken::TALENT_TOKEN_VALUE_IN_USD).to_i.to_s
      expect(talent.market_cap_variance).to eq variance
      expect(talent.supporters_count).to eq 2
    end
  end

  context "when there are no changes in the token day data" do
    let(:token_day_data) { [] }

    it "updates the talent information with the correct data" do
      refresh_supporters

      talent.reload

      aggregate_failures do
        expect(talent.total_supply).to eq "183000000000000000000"
        expect(talent.market_cap).to eq ("183000000000000000000".to_f * TalentToken::TALENT_TOKEN_VALUE_IN_USD).to_i.to_s
        expect(talent.market_cap_variance).to eq 0
        expect(talent.supporters_count).to eq 2
      end
    end
  end

  context "when the talent supporter records already exist in the database" do
    let!(:talent_supporter_one) do
      create(
        :talent_supporter,
        supporter_wallet_id: "99asn",
        talent_contract_id: talent_contract_id,
        tal_amount: "300000000000000000000"
      )
    end
    let!(:talent_supporter_two) do
      create(
        :talent_supporter,
        supporter_wallet_id: "01ksh",
        talent_contract_id: talent_contract_id,
        tal_amount: "200"
      )
    end

    let!(:connection_one) do
      create(
        :connection,
        user: talent_user,
        connected_user: supporter_one
      )
    end

    let!(:connection_two) do
      create(
        :connection,
        user: supporter_one,
        connected_user: talent_user
      )
    end

    let!(:connection_three) do
      create(
        :connection,
        user: talent_user,
        connected_user: supporter_two
      )
    end

    let!(:connection_four) do
      create(
        :connection,
        user: supporter_two,
        connected_user: talent_user
      )
    end

    it "does not create extra talent supporter records" do
      expect { refresh_supporters }.not_to change(TalentSupporter, :count)
    end

    it "does not create extra connection records" do
      expect { refresh_supporters }.not_to change(Connection, :count)
    end

    it "updates the talent supporter records data" do
      refresh_supporters

      talent_supporter_one.reload
      talent_supporter_two.reload

      aggregate_failures do
        expect(talent_supporter_one.amount).to eq "60000000000000000000"
        expect(talent_supporter_one.tal_amount).to eq "300000000000000000000"
        expect(talent_supporter_one.last_time_bought_at).to eq Time.at(1657727823)
        expect(talent_supporter_one.first_time_bought_at).to eq Time.at(1627727823)

        expect(talent_supporter_two.amount).to eq "90000000000000000000"
        expect(talent_supporter_two.tal_amount).to eq "450000000000000000000"
        expect(talent_supporter_two.last_time_bought_at).to eq Time.at(1657564775)
        expect(talent_supporter_two.first_time_bought_at).to eq Time.at(1627564775)
      end
    end

    it "updates the connections records data" do
      refresh_supporters

      connection_one.reload
      connection_two.reload
      connection_three.reload
      connection_four.reload

      aggregate_failures do
        expect(connection_one.user_invested_amount).to eq "0"
        expect(connection_one.connected_user_invested_amount).to eq "60000000000000000000"
        expect(connection_one.connection_type).to eq "staker"
        expect(connection_one.connected_at).to eq Time.at(1627727823)

        expect(connection_two.user_invested_amount).to eq "60000000000000000000"
        expect(connection_two.connected_user_invested_amount).to eq "0"
        expect(connection_two.connection_type).to eq "staking"
        expect(connection_two.connected_at).to eq Time.at(1627727823)

        expect(connection_three.user_invested_amount).to eq "0"
        expect(connection_three.connected_user_invested_amount).to eq "90000000000000000000"
        expect(connection_three.connection_type).to eq "staker"
        expect(connection_three.connected_at).to eq Time.at(1627564775)

        expect(connection_four.user_invested_amount).to eq "90000000000000000000"
        expect(connection_four.connected_user_invested_amount).to eq "0"
        expect(connection_four.connection_type).to eq "staking"
        expect(connection_four.connected_at).to eq Time.at(1627564775)
      end
    end
  end

  context "when the request needs to be paginated" do
    let(:supporters_data) do
      [
        OpenStruct.new(
          id: SecureRandom.hex,
          supporter: OpenStruct.new(id: SecureRandom.hex),
          amount: "60000000000000000000",
          tal_amount: "300000000000000000000"
        )
      ]
    end

    it "initializes the graph client once" do
      refresh_supporters

      expect(the_graph_client_class).to have_received(:new).once
    end

    it "requests the talent supporters twice" do
      freeze_time do
        refresh_supporters

        expect(the_graph_client_instance).to have_received(:talent_supporters).with(
          talent_address: talent_contract_id,
          variance_start_date: (Time.now.utc - 30.days).to_i,
          offset: 0
        )
        expect(the_graph_client_instance).to have_received(:talent_supporters).with(
          talent_address: talent_contract_id,
          variance_start_date: (Time.now.utc - 30.days).to_i,
          offset: 1
        )
      end
    end
  end
end
