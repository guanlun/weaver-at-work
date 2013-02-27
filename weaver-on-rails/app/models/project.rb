class Project < ActiveRecord::Base
  has_many :project_comments
  attr_accessible :content, :title, :category, :time, :developers, :image, :description
end
