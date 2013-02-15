class TextComment < ActiveRecord::Base
  belongs_to :text
  attr_accessible :content, :name

  validates_presence_of :name, :message => "name cannot be empty"
  validates_presence_of :content, :message => "content cannot be empty"
end
