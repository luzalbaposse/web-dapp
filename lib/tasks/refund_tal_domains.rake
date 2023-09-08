namespace :refund do
  desc "Refund Tal Domains"
  # rake "refund:tal_domains[https://gist.githubusercontent.com/RubenSousaDinis/99c5ecf198d0c19d373ae4ec57dda6d7/raw/40a54bfab984490f2b9f9234f0ea4b5be15b882f/refunds.csv]"
  task :tal_domains, [:csv_file_path, :prod] => :environment do |_t, args|
    csv_path = args.csv_file_path
    prod = args.prod == "true"

    unless csv_path.match?(/.?.csv/)
      raise "Invalid CSV file"
    end

    csv_data = csv_path.starts_with?("http") ? URI.parse(csv_path).read : File.read(csv_path)

    row_line = 1
    rows = CSV.parse(csv_data, headers: true)
    rows_count = rows.count

    signer_key = Eth::Key.new priv: ""
    puts signer_key.address
    rpc_url = prod ? "https://eth.llamarpc.com" : "https://rpc2.sepolia.org"
    puts rpc_url
    eth_client = Eth::Client.create rpc_url
    eth_client.max_priority_fee_per_gas = 100 * Eth::Unit::GWEI
    eth_client.max_fee_per_gas = 300 * Eth::Unit::GWEI
    refunded = []
    failed = []

    rows.each do |register_tx|
      original_tx = register_tx["txhash"]
      wallet_id = register_tx["wallet"]
      eth_value = register_tx["eth_value"]
      user = User.find_by(wallet_id: wallet_id)

      puts "Refunding #{user&.email || wallet_id} with #{eth_value} ETH"

      refund_tx_hash = eth_client.transfer(wallet_id, eth_value.to_f * Eth::Unit::ETHER, sender_key: signer_key)
      success = wait_for_tx_to_run(eth_client, refund_tx_hash)

      if success
        puts "Refunded #{user&.email} - #{wallet_id} - #{refund_tx_hash}"
        refunded << {
          email: user&.email,
          wallet: wallet_id,
          refund_tx_hash: refund_tx_hash,
          eth_value: eth_value,
          original_tx: original_tx
        }
      else
        puts "Failed #{user&.email} - #{wallet_id}"
        failed << {
          email: user&.email,
          wallet: wallet_id,
          refund_tx_hash: refund_tx_hash,
          eth_value: eth_value,
          original_tx: original_tx
        }
      end

      puts "Progress: #{row_line} of #{rows_count}"
      row_line += 1
    end
    puts "Refunded"
    puts refunded
    puts "Failed"
    puts failed
  end

  def wait_for_tx_to_run(client, tx_hash)
    # at most wait - 30 seconds
    max_attempts = 10
    attempts = 0
    while !client.tx_mined?(tx_hash) && attempts < max_attempts
      attempts += 1
      sleep 5 # 5 seconds
    end

    # confirm we broke the loop with mined TX
    if client.tx_mined?(tx_hash)
      client.tx_succeeded?(tx_hash)
    else
      false
    end
  end
end
