class Text < ActiveRecord::Base
  has_many :text_comments
  attr_accessible :content, :title, :category, :image
end
