class AddAttachmentPhotoToFilms < ActiveRecord::Migration[5.2]
  def self.up
    change_table :films do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :films, :photo
  end
end
