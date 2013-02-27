class GalleryComment < ActiveRecord::Base
  belongs_to :gallery
  attr_accessible :content, :name
end
