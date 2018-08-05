class RenameTypeColumnToNegas < ActiveRecord::Migration[5.2]
  def change
  	rename_column :negas, :type, :title
  end
end
