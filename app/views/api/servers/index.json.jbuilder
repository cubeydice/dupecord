@user.servers.each do |server|
    json.set! server.id do
        json.extract!(server, :id, :name, :owner_id, :server_icon, :channels)
    end
end
