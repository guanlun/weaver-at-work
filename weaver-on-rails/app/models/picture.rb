class Picture < ActiveRecord::Base
  belongs_to :gallery
  attr_accessible :description, :link, :title
end
