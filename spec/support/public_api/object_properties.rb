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

    ORGANIZATION_PROPERTIES = {
      banner_url: {type: :string, nullable: true},
      description: {type: :string, nullable: true},
      discord: {type: :string, nullable: true},
      github: {type: :string, nullable: true},
      linkedin: {type: :string, nullable: true},
      location: {type: :string, nullable: true},
      logo_url: {type: :string, nullable: true},
      name: {type: :string},
      slug: {type: :string},
      tags: {type: :array, items: {type: :string}},
      telegram: {type: :string, nullable: true},
      twitter: {type: :string, nullable: true},
      type: {type: :string},
      verified: {type: :boolean},
      website: {type: :string, nullable: true}
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

    SPONSORSHIP_PROPERTIES = {
      amount: {type: :string, description: "The amount sponsored"},
      chain_id: {type: :integer, description: "The id of the chain"},
      token: {type: :string, description: "The token address"},
      symbol: {type: :string, description: "The token ticker"},
      claimed_at: {type: :string, format: :datetime, description: "The timestamp of the sponsor claim", nullable: true},
      revoked_at: {type: :string, format: :datetime, description: "The timestamp of the sponsor revoke", nullable: true},
      status: {type: :string, enum: %w[pending claimed revoked], description: "The status of the sponsorship"},
      sponsor_address: {type: :string, description: "The wallet address of the sponsor"},
      sponsored_address: {type: :string, description: "The wallet address of the sponsored talent"},
      sponsor: {type: :object, properties: TALENT_PROPERTIES, description: "The sponsor talent", nullable: true},
      sponsored: {type: :object, properties: TALENT_PROPERTIES, description: "The sponsored talent", nullable: true}
    }

    LEADERBOARD_PROPERTIES = {
      score: {type: :integer, description: "The score of the talent in the leaderboard"},
      talent: {type: :object, properties: TALENT_PROPERTIES, description: "The talent"}
    }

    QUEST_PROPERTIES = {
      experience_points_amount: {type: :integer, description: "The points credited by the quest"},
      title: {type: :string, description: "The title of the quest"},
      description: {type: :string, description: "The description of the quest"},
      completed_at: {type: :string, format: :datetime, description: "The timestamp of the quest completion", nullable: true}
    }

    ACTIVITY_PROPERTIES = {
      content: {type: :object, description: "The activity content"},
      created_at: {type: :string, format: :datetime, description: "The timestamp of the activity creation"},
      target_user: {type: :object, properties: TALENT_PROPERTIES, description: "The target talent of the activity", nullable: true},
      origin_user: {type: :object, properties: TALENT_PROPERTIES, description: "The origin talent of the activity"},
      type: {type: :string, description: "The type of the activity", nullable: true}
    }

    EXPERIENCE_POINTS_LEADERBOARD_PROPERTIES = {
      results: {
        type: :array,
        items: {
          type: :object,
          properties: TALENT_PROPERTIES
        }
      },
      talent_result: {
        type: :object,
        properties: {
          score: {type: :integer, description: "The score of the talent in the leaderboard"},
          position: {type: :integer, description: "The position of the talent in the leaderboard", nullable: true}
        }
      }
    }
  end
end
