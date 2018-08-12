class RemoveUserIdFromNegas < ActiveRecord::Migration[5.2]
  def change
    remove_column :negas, :user_id, :integer
  end
end
