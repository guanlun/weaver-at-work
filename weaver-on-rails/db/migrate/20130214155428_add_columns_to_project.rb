class AddColumnsToProject < ActiveRecord::Migration
  def up
    add_column :projects, :category, :string
    add_column :projects, :time, :string
    add_column :projects, :developers, :string
    add_column :projects, :images, :string
  end

  def down
    remove_column :projects, :category
    remove_column :projects, :time
    remove_column :projects, :developers
    remove_column :projects, :images
  end
end
