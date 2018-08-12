class RemoveUserIdFromFilms < ActiveRecord::Migration[5.2]
  def change
    remove_column :films, :user_id, :integer
  end
end
