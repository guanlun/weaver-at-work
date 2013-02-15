class Project < ActiveRecord::Base
  attr_accessible :content, :title, :category, :time, :developers, :images
end
