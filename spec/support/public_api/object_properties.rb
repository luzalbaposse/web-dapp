module PublicAPI
  module ObjectProperties
    PAGINATION_PROPERTIES = {
      total: {
        type: :integer,
        description: "The total amount of records"
      },
      cursor: {
        type: :string,
        description: "The cursor to fetch the next page of records",
        nullable: true
      }
    }

    TALENT_PROPERTIES = {
      username: {type: :string},
      name: {type: :string},
      headline: {type: :string, nullable: true},
      profile_picture_url: {type: :string, nullable: true},
      email: {type: :string},
      wallet_address: {type: :string, nullable: true}
    }

    DETAILED_TALENT_PROPERTIES = TALENT_PROPERTIES.merge({
      subscriber_count: {type: :integer},
      subscribing_count: {type: :integer},
      supporters_count: {type: :integer},
      supporting_count: {type: :integer}
    })

    CONNECTION_PROPERTIES = {
      username: {type: :string, description: "The username of the connected user"},
      name: {type: :string, description: "The name of the connected user"},
      wallet_address: {type: :string, description: "The wallet address of the connected user"},
      user_invested_amount: {type: :string, description: "The amount invested by the user"},
      connected_user_invested_amount: {type: :string, description: "The amount invested by the connected user"},
      connection_type: {type: :string, enum: Connection.connection_types.keys, description: "The type of the connection"},
      connected_at: {type: :string, format: :datetime, description: "The timestamp of the initial date the users connected"},
      profile_picture_url: {type: :string, nullable: true, description: "The profile picture of the connected user"},
      ticker: {type: :string, nullable: true, description: "The token ticker of the connected user"}
    }

    CAREER_UPDATES_PROPERTIES = {
      message: {type: :string, description: "The message sent by the talent"},
      created_at: {type: :string, format: :datetime, description: "The creation date of the career update"}
    }
  end
end
