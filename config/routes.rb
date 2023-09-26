require "sidekiq/web"
require "sidekiq-scheduler/web"

Rails.application.routes.draw do
  extend PublicAPIRoutes
  # Admin area
  constraints Clearance::Constraints::SignedIn.new { |user| user&.admin? } do
    mount Sidekiq::Web => "/sidekiq"
    mount Blazer::Engine, at: "data-analytics"
  end
  # end Admin

  # Moderator area
  constraints Clearance::Constraints::SignedIn.new { |user| user&.moderator? || user&.admin? } do
    resource :support, only: [:show] do
      get :search
      resources :user, to: "supports#user_page", only: [:show]
    end
  end
  # end Moderator

  # Business - require log-in
  constraints Clearance::Constraints::SignedIn.new do
    get "/" => redirect("/home")
    get "/home" => "homepage#index", :as => :user_root
    # file uploads
    unless Rails.env.test?
      mount Shrine.uppy_s3_multipart(:cache) => "/s3/multipart"
    end

    # Talent pages & search
    resources :talent, only: [:index]
    # Portfolio
    resource :portfolio, only: [:show] do
      get :tokens
      get :overview
    end
    get "wallet" => "portfolio#show", :as => :wallet

    # Chat
    resources :messages, only: [:index, :show, :create] do
      post :send_to_all_supporters, on: :collection
      get :send_to_all_supporters_status, on: :collection
    end

    mount ActionCable.server => "/cable"

    # Rewards
    get "quests", to: "quests#index"

    resources :profiles, only: [:show], param: :username

    # Connections
    resource :connection, only: [:show]
    get "/network", to: redirect("/connection")

    namespace :api, defaults: {format: :json} do
      namespace :v1 do
        resources :users, only: [:index, :update] do
          resources :delete_account_tokens, module: "users", only: [:create]
        end

        resources :notifications, only: [:index] do
          put :mark_as_read
        end
        post "clear_notifications", to: "notifications#mark_all_as_read"

        resources :talent, only: [:index, :update] do
          resources :milestones, only: [:create, :update, :destroy], module: "talent"
          resources :tokens, only: [:update], module: "talent"
          resources :career_goals, only: [:update], module: "talent"
        end
        resources :stakes, only: [:create]
        post "reward_claiming", to: "stakes#reward_claiming"
        resources :races, only: [:show]
        resources :impersonations, only: [:create, :destroy]
        resources :tags, only: [:index]
        resources :wallet_activities, only: [:index, :create]
        resources :elections, only: [:index] do
          post :vote
        end
      end
    end
  end

  # Public routes

  # Collectives
  resources :collectives, controller: :organizations, only: %i[index show]

  # Auth - Clearance generated routes
  resources :passwords, controller: "passwords", only: [:create]
  resource :session, controller: "sessions", only: [:create]

  resources :users, only: [:create, :index] do
    post :send_confirmation_email
    resource :password,
      controller: "passwords",
      only: [:update]
  end

  constraints Routes::FormatConstraints.new(:html) do
    get "/join(/:invite_code)" => "onboard#sign_up", :as => :sign_up
    get "/" => "onboard#sign_in"
    delete "/" => "sessions#new", :as => "sign_in_redirect"
    get "/passwords/new" => "onboard#forgot_password", :as => "forgot_password"
    get "/confirm_email(/:token)" => "email_confirmations#update", :as => "confirm_email"
    get "/users(/:user_id)/password(?token=:token)" => "onboard#reset_password"
  end

  get "/auth/linkedin/callback", to: "oauth_callbacks#linkedin"
  post "/auth/unstoppable_domains/login", to: "oauth_callbacks#unstoppable_domains"

  delete "/sign_out" => "sessions#destroy", :as => "sign_out"
  # end Auth

  get "/u/:username/delete_account" => "users#destroy", :as => "delete_account", :constraints => {username: /[^\/]+/}
  get "/u/:username/profile" => "profiles#preview"
  get "/u/:username" => "profiles#show", :as => "user", :constraints => {username: /[^\/]+/}
  get "/u/:username/settings" => "profiles#settings", :as => "settings", :constraints => {username: /[^\/]+/}
  get "/u/:username/experiences" => "profiles#experiences", :as => "user_details", :constraints => {username: /[^\/]+/}
  # redirect /talent to /u so we have the old route still working
  get "/talent/:username", to: redirect("/u/%{username}"), as: "talent_profile"

  constraints Routes::FormatConstraints.new(:html) do
    root to: "sessions#new", as: :root
  end

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  match "*unmatched", to: "application#route_not_found", via: :all
end
