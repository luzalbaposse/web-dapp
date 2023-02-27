module PublicAPIRoutes
  def self.extended(router)
    router.instance_exec do
      namespace :api, defaults: {format: :json} do
        namespace :v1 do
          # API authenticated endpoints
          scope module: :public_api, as: "public" do
            resources :talents, only: [:show]
            resources :followers, only: [:index]
            resources :supporters, only: [:index]
          end

          # API non authenticated endpoints
          resources :supporters, only: [:index]
          resources :talent, only: [:show]
          get "/public_talent" => "talent#public_index"

          resource :username, only: [] do
            get :valid, on: :collection
          end

          resources :users, only: [:show] do
            get :domain_owner, on: :collection

            namespace :profile do
              resources :community, only: [:index]
              resources :perks, only: [:index]

              scope :web3 do
                get :tokens, to: "web3#tokens"
                get :nfts, to: "web3#nfts"
                get :poaps, to: "web3#poaps"
              end
            end
          end
        end
      end
    end
  end
end