class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.references :server, foreign_key: true
      t.string :name, null: false
      t.string :category
      t.text :topic
      t.timestamps
    end
  end
end
