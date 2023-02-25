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
      profile_picture_url: {type: :string, nullable: true},
      email: {type: :string},
      wallet_address: {type: :string, nullable: true}
    }

    DETAILED_TALENT_PROPERTIES = TALENT_PROPERTIES.merge({
      followers_count: {type: :integer},
      following_count: {type: :integer},
      supporters_count: {type: :integer},
      supporting_count: {type: :integer}
    })
  end
end
