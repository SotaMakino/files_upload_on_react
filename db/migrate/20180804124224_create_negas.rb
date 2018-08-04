class CreateNegas < ActiveRecord::Migration[5.2]
  def change
    create_table :negas do |t|
      t.string :type
      t.text :description

      t.timestamps
    end
  end
end
