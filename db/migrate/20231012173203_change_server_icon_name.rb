class ChangeServerIconName < ActiveRecord::Migration[7.0]
  def change
    rename_column :servers, :icon_url, :server_icon
  end
end
