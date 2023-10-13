json.servers do
    # servers owned by user
    @user.owned_servers.each do |server|
        json.set! server.id do
            json.extract!(server, :id, :name, :owner_id, :server_icon)
        end
    end

    # servers joined (not owned) by user
    @user.servers.each do |server|
        json.set! server.id do
            json.extract!(server, :id, :name, :owner_id, :server_icon)
        end
    end
end