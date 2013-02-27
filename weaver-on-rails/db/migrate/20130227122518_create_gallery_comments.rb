class CreateGalleryComments < ActiveRecord::Migration
  def change
    create_table :gallery_comments do |t|
      t.string :name
      t.string :content
      t.references :gallery

      t.timestamps
    end
    add_index :gallery_comments, :gallery_id
  end
end
