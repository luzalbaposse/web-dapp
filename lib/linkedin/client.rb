module Linkedin
  class Client
    ACCESS_TOKEN_URI = "https://www.linkedin.com/oauth/v2/accessToken"
    EMAIL_ADDRESS_URI = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"
    LITE_PROFILE_URI = "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))"

    def retrieve_access_token(code)
      Faraday
        .post(
          ACCESS_TOKEN_URI,
          {
            client_id: ENV["LINKEDIN_CLIENT_ID"],
            client_secret: ENV["LINKEDIN_CLIENT_SECRET"],
            code: code,
            grant_type: "authorization_code",
            redirect_uri: ENV["LINKEDIN_REDIRECT_URI"]
          },
          {"Content-Type": "application/x-www-form-urlencoded"}
        )
    end

    def retrieve_email_address(access_token)
      Faraday
        .get(EMAIL_ADDRESS_URI, {}, {Authorization: "Bearer #{access_token}"})
    end

    def retrieve_lite_profile(access_token)
      Faraday
        .get(LITE_PROFILE_URI, {}, {Authorization: "Bearer #{access_token}"})
    end
  end
end
