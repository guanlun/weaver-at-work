class RemoveDescriptionFromPicture < ActiveRecord::Migration
  def up
    remove_column :pictures, :description
  end

  def down
    add_column :pictures, :description, :string
  end
end
