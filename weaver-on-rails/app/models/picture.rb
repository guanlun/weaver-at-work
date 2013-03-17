class Picture < ActiveRecord::Base
  belongs_to :gallery
  attr_accessible :link, :title

  validates_presence_of :link, :title
end
