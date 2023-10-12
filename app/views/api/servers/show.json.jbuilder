json.server do
    json.extract! @server, :name, :owner_id, :server_icon, :created_at, :updated_at
end