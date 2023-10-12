json.server do
    json.extract! @server, :name, :owner_id, :icon_url, :avatar_url, :created_at, :updated_at
end