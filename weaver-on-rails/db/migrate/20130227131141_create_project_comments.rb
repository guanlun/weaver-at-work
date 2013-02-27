class CreateProjectComments < ActiveRecord::Migration
  def change
    create_table :project_comments do |t|
      t.string :name
      t.string :content
      t.references :project

      t.timestamps
    end
    add_index :project_comments, :project_id
  end
end
