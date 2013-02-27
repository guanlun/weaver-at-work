WeaverOnRails::Application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  get "/", :to => "home#index"

  get "/about", :to => "home#about"

  get "/texts", :to => "text#list"
  get "/texts/:id", :to => "text#show"
  post "/texts/:id/add_comment", :to => "text#add_comment"

  get "/projects", :to => "project#list"
  get "/projects/:id", :to => "project#show"
  post "/projects/:id/add_comment", :to => "project#add_comment"

  get "/gallery", :to => "gallery#list"
  get "/gallery/:id", :to => "gallery#show"
  post "/gallery/:id/add_comment", :to => "gallery#add_comment"

  get "/superuser", :to => "superuser#login"
  post "/superuser/auth", :to => "superuser#auth"
  get "/superuser/interface", :to => "superuser#interface"
  post "/superuser/upload_picture", :to => "superuser#upload_picture"
end
