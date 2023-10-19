#SERVER INFO
if @server
    json.server do
        json.extract!(@server, :id, :name, :owner_id, :server_icon, :channels)
    end

    #server channels
    channels = @server.channels
    categories = []

    channels.each do |channel|
        json.channels do
            json.set! channel.id do
                json.extract!(channel, :id, :name, :category, :topic, :messages)
            end
        end

        categories << channel.category
    end

    #server channel categories
    json.categories do
        json.array! categories.uniq
    end

    json.users do
        @server.users.each do |user|
            json.set! user.id do
                json.extract!(user, :id, :username)
            end
        end
    end

    json.owner do
        json.extract!(@server.owner, :id, :username)
    end
end

#CHANNEL INFO
if @channel
    json.channel do
        json.extract!(@channel, :id, :name, :category, :topic)
    end
end