json.user do
    json.extract! @user, :id, :email, :username, :bio, :avatar_url, :pronouns, :created_at, :updated_at
end

json.servers do
    @user.servers.each do |server|
        json.set! server.id do
            json.extract!(server, :id, :server_name, :owner_id, :server_image)
        end
    end
end