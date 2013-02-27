class Gallery < ActiveRecord::Base
  attr_accessible :description, :title
  has_many :gallery_comments
  has_many :pictures
end
