class AddUserIdToNega < ActiveRecord::Migration[5.2]
  def change
    add_column :negas, :user_id, :integer
  end
end
