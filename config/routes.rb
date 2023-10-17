Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :user_servers, only: [:create, :delete]
    resources :channels, only: [:show, :create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
