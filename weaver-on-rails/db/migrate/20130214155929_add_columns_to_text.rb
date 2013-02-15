class AddColumnsToText < ActiveRecord::Migration
  def up
    add_column :texts, :category, :string
    add_column :texts, :image, :string
  end

  def down
    remove_column :texts, :category
    remove_column :texts, :image
  end
end
