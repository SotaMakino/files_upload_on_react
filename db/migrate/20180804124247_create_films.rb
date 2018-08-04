class CreateFilms < ActiveRecord::Migration[5.2]
  def change
    create_table :films do |t|
      t.integer :nega_id

      t.timestamps
    end
  end
end
