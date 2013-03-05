class Picture < ActiveRecord::Base
  belongs_to :gallery
  attr_accessible :description, :link, :title

  validates_presence_of :description, :link, :title
end
