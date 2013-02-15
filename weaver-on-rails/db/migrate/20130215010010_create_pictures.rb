class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :title
      t.string :description
      t.string :link
      t.references :gallery

      t.timestamps
    end
    add_index :pictures, :gallery_id
  end
end
