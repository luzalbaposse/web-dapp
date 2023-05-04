# frozen_string_literal: true

class OauthCallbacksController < ApplicationController
  def linkedin
    result = Linkedin::OauthHandler.new(code: params[:code], invite_code: params[:invite_code], utm_source: params[:utm_source]).call
    if result[:success]
      sign_in(result[:user])
      redirect_to root_path
    else
      redirect_to root_path, flash: {error: "Failed LinkedIn login"}
    end
  end
end
