require "web3_api/api_proxy"

module Talents
  class ChewySearch
    PAGE_NEUTRALIZER = 1
    ADMIN_FILTER_STATUS = [
      "Admin all",
      "Pending approval"
    ].freeze

    def initialize(
      filter_params: {},
      admin_or_moderator: false,
      size: 40,
      from: 0,
      searching_user: nil,
      discovery_row: nil
    )
      @filter_params = filter_params
      @admin_or_moderator = admin_or_moderator
      @size = size
      @from = from
      @searching_user = searching_user
      @discovery_row = discovery_row
    end

    def call
      talents = talent_scope
      talents = talents.query.not({match: {"user.profile_type": "applying"}})
      talents = filter_by_discovery_row(talents) if discovery_row
      talents = query_for_keyword(talents) if keyword.present?
      talents = query_for_status(talents)
      talents = sort(talents)
      total_count = talents.count
      talents = talents.limit(size).offset(from)
      [{
        current_page: ((from + PAGE_NEUTRALIZER) / size.to_f).ceil,
        last_page: (total_count / size.to_f).ceil,
        total_count: total_count
      }, talents.entries.map do |talent|
        talent_record = Talent.find_by!(id: talent.id)
        attributes = talent.attributes.deep_stringify_keys
        attributes["profile_picture_url"] = talent_record.profile_picture_url
        attributes["banner_url"] = talent_record.banner_url
        attributes
      end]
    end

    private

    attr_reader :filter_params, :admin_or_moderator, :size, :from, :searching_user, :discovery_row

    def talent_scope
      if admin_or_moderator && ADMIN_FILTER_STATUS.include?(filter_params[:status])
        TalentsIndex.query({match_all: {}})
      else
        TalentsIndex.query({
          bool: {
            must: [
              {term: {hide_profile: false}},
              {range: {
                "user.profile_completeness": {
                  gte: 0.5
                }
              }}
            ]
          }
        })
      end
    end

    def query_for_keyword(talents)
      talents.query({
        query_string: {
          query: "*#{keyword}*",
          fields: [
            "user.username",
            "user.display_name",
            "user.tags",
            "talent_token.ticker",
            "occupation",
            "headline",
            "location",
            "milestones.*",
            "carrer_goal.*",
            "career_goal.goals.*"
          ],
          allow_leading_wildcard: true,
          default_operator: "AND"
        }
      })
    end

    def query_for_status(talents)
      if filter_params[:status] == "Launching soon"
        talents
          .query.not({exists: {field: "talent_token.contract_id"}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Latest added" || filter_params[:status] == "Trending"
        talents
          .query([{
            exists: {field: "talent_token.contract_id"}
          }, {
            range: {
              "talent_token.deployed_at": {
                gte: 1.month.ago
              }
            }
          }])
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Pending approval" && admin_or_moderator
        talents
          .query({match: {"user.profile_type": "waiting_for_approval"}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Verified"
        talents
          .query({term: {verified: true}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "By Celo Network"
        talents
          .query([{
            exists: {field: "talent_token.contract_id"}
          }, {
            match: {"talent_token.chain_id": chain_id("celo")}
          }])
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "By Polygon Network"
        talents
          .query([{
            exists: {field: "talent_token.contract_id"}
          }, {
            match: {"talent_token.chain_id": chain_id("polygon")}
          }])
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Looking for a mentor"
        talents
          .query({match: {"career_goal.career_needs.title": CareerNeed::LOOKING_MENTORSHIP}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Looking to mentor others"
        talents
          .query({match: {"career_goal.career_needs.title": CareerNeed::MENTORING_OTHERS}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Looking to hire"
        hiring_needs = CareerNeed::HIRING_NEEDS.join("")
        talents
          .query({query_string: {query: hiring_needs, fields: ["career_goal.career_needs.*"]}})
          .order({"user.profile_completeness": {order: :desc}})
      elsif filter_params[:status] == "Looking for new opportunities"
        role_needs = CareerNeed::ROLE_NEEDS.map { |r| "(#{r})" }.join(" OR ")
        talents
          .query({query_string: {query: role_needs, fields: ["career_goal.career_needs.*"]}})
          .order({"user.profile_completeness": {order: :desc}})
      else
        talents.query({
          function_score: {
            functions: [
              {
                random_score: {
                  seed: Date.today.jd
                }
              }
            ]
          }
        })
      end
    end

    def filter_by_watchlist(talents)
      talents.query({terms: {"user.id": searching_user.users_subscribing.pluck(:user_id)}})
    end

    def filter_by_discovery_row(talents)
      talents = talents.query({term: {"user.discovery_row_ids": discovery_row.id}})
      talents.query({bool: {
        should: [
          {term: {"user.profile_type": "talent"}},
          {term: {"user.profile_type": "approved"}}
        ]
      }})
    end

    def sort(talents)
      if filter_params[:status] == "Latest added" || filter_params[:status] == "Trending"
        talents.order({"token.deployed_at": {order: :asc, unmapped_type: "date"}})
      else
        talents
      end
    end

    def keyword
      @keyword ||= filter_params[:keyword]
    end

    def chain_id(network_name)
      contract_env = ENV["CONTRACTS_ENV"]
      network = (contract_env == "production") ? Web3Api::ApiProxy.const_get("#{network_name.upcase}_CHAIN") : Web3Api::ApiProxy.const_get("TESTNET_#{network_name.upcase}_CHAIN")
      network[2].to_i
    end
  end
end
