class AddDescriptionToText < ActiveRecord::Migration
  def up
    add_column :texts, :description, :string
  end

  def down
    remove_column :texts, :description
  end
end
