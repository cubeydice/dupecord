json.server do
    json.extract!(@server, :id, :name, :owner_id, :server_icon, :channels)
end
