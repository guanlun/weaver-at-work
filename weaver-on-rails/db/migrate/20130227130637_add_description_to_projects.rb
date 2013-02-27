class AddDescriptionToProjects < ActiveRecord::Migration
  def up
    add_column :projects, :description, :string
  end

  def down
    remove_column :projects, :description
  end
end
