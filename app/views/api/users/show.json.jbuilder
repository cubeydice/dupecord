# general user info
json.user do
    json.extract! @user, :id, :email, :username, :bio, :avatar_url, :pronouns, :created_at, :updated_at
end

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