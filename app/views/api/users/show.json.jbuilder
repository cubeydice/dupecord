# general user info
json.current_user do
    json.extract! @user, :id, :email, :username, :bio, :avatar_url, :pronouns, :created_at, :updated_at
end

json.user do
    json.extract! @user, :id, :email, :username, :bio, :avatar_url, :pronouns, :created_at, :updated_at
end

# servers user owns or is a part of
json.servers do
    @user.servers.each do |server|
        json.set! server.id do
            json.extract!(server, :id, :name, :owner_id, :server_icon, :channels)
        end
    end
end

#all messages by user
json.messages do
    @user.messages.each do |message|
        json.set! message.id do
            json.extract!(message, :id, :content)
        end
    end
end