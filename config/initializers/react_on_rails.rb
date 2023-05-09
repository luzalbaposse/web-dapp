# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

module RenderingExtension
  def self.custom_context(view_context)
    {
      contractsEnv: ENV["CONTRACTS_ENV"],
      walletConnectProjectId: ENV["WALLET_CONNECT_PROJECT_ID"],
      transakApiKey: ENV["TRANSAK_API_KEY"],
      emailRegexWithoutAliases: ENV["EMAIL_REGEX_WITHOUT_ALIASES"],
      disableSmartContracts: ENV["DISABLE_SMART_CONTRACTS"],
      disableSmartContractsMessage: ENV["DISABLE_SMART_CONTRACTS_MESSAGE"],
      withPersonaTemplateId: ENV["WITH_PERSONA_TEMPLATE_ID"],
      withPersonaEnvironment: ENV["WITH_PERSONA_ENVIRONMENT"],
      withPersonaVerificationsLimit: ENV["WITH_PERSONA_VERIFICATIONS_LIMIT"],
      talBaseDomain: ENV["TAL_BASE_DOMAIN"],
      linkedinClientId: ENV["LINKEDIN_CLIENT_ID"],
      linkedinRedirectUri: ENV["LINKEDIN_REDIRECT_URI"],
      captchaKey: ENV["RECAPTCHA_SITE_KEY"]
    }
  end
end

ReactOnRails.configure do |config|
  config.build_test_command = "RAILS_ENV=test bin/webpack"
  config.server_bundle_js_file = "application.js"
  config.same_bundle_for_client_and_server = true
  config.rendering_extension = RenderingExtension
end
