class CreateTextComments < ActiveRecord::Migration
  def change
    create_table :text_comments do |t|
      t.string :name
      t.string :content
      t.references :text

      t.timestamps
    end
    add_index :text_comments, :text_id
  end
end
