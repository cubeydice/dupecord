class AddDefaultAvatartoUsersTable < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :avatar_url, :string, null: false, default: 'https://i.imgur.com/mofLYAV.png'
  end
end
