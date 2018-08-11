class AddUserIdToFilms < ActiveRecord::Migration[5.2]
  def change
    add_column :films, :user_id, :integer
  end
end
