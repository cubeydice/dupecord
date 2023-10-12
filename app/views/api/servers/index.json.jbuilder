json.servers do
    @servers.each do |server|
        json.set! server.id do
            json.extract!(server, :id, :server_name, :owner_id, :server_image)
        end
    end
end