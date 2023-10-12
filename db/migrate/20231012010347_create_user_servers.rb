class CreateUserServers < ActiveRecord::Migration[7.0]
  def change
    create_table :user_servers do |t|
      t.references :user, presence: true, foreign_key: false
      t.references :server, presence: true, foreign_key: false
      t.bigint :group_id
      t.timestamps
    end

    add_index :user_servers, [:user_id, :server_id, :group_id], unique: true
  end
end
