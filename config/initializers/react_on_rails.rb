# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

module RenderingExtension
  def self.custom_context(view_context)
    {
      contractsEnv: ENV["CONTRACTS_ENV"],
      emailRegexWithoutAliases: ENV["EMAIL_REGEX_WITHOUT_ALIASES"],
      disableSmartContracts: ENV["DISABLE_SMART_CONTRACTS"],
      disableSmartContractsMessage: ENV["DISABLE_SMART_CONTRACTS_MESSAGE"],
      talBaseDomain: ENV["TAL_BASE_DOMAIN"],
      linkedinClientId: ENV["LINKEDIN_CLIENT_ID"],
      linkedinRedirectUri: ENV["LINKEDIN_REDIRECT_URI"],
      captchaKey: ENV["RECAPTCHA_SITE_KEY"],
      worldcoinAppId: ENV["WORLDCOIN_APP_ID"],
      worldcoinQuestAction: ENV["WORLDCOIN_QUEST_ACTION"],
      walletConnectProjectId: ENV["WALLET_CONNECT_PROJECT_ID"]
    }
  end
end

ReactOnRails.configure do |config|
  config.build_test_command = "RAILS_ENV=test bin/webpack"
  config.server_bundle_js_file = "application.js"
  config.same_bundle_for_client_and_server = true
  config.rendering_extension = RenderingExtension
end
