namespace :connection do
  desc "Add connection_types to connections"
  task add_connection_types: :environment do
    total_connections = Connection.count
    Connection.order(:id).find_each.with_index do |connection, index|
      connection.refresh_connection!

      puts "Processed #{index + 1} of #{total_connections} connections"
    end
    puts "Done. Processed a total of #{total_connections} connections."
  end
end
