Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  get '/auth/github', to: 'authentication#github', format: false
  resources :users
  resources :negas
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
