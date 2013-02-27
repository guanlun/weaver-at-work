class RenameColumnInProject < ActiveRecord::Migration
  def up
    rename_column :projects, :images, :image
  end

  def down
    rename_column :projects, :image, :images
  end
end
