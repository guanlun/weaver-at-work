WeaverOnRails::Application.routes.draw do
  devise_for :users

  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'

  get "/", :to => "home#index"

  get "/about", :to => "home#about"

  get "/texts", :to => "text#list"
  get "/texts/:path", :to => "text#show"
  post "/texts/:path/add_comment", :to => "text#add_comment"

  get "/projects", :to => "project#list"
  get "/projects/:path", :to => "project#show"
  post "/projects/:path/add_comment", :to => "project#add_comment"

  get "/gallery", :to => "gallery#list"
  get "/gallery/:path", :to => "gallery#show"
  post "/gallery/:path/add_comment", :to => "gallery#add_comment"

  get "/superuser", :to => "superuser#login"
  post "/superuser/auth", :to => "superuser#auth"
  get "/superuser/interface", :to => "superuser#interface"
  post "/superuser/upload_picture", :to => "superuser#upload_picture"
  post "/superuser/create_gallery", :to => "superuser#create_gallery"
end
