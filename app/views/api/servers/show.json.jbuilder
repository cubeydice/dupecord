if @server
    json.server do
        json.extract!(@server, :id, :name, :owner_id, :server_icon, :channels)
    end
end

channels = @server.channels
categories = []

channels.each do |channel|
    json.channels do
        json.set! channel.id do
            json.extract!(channel, :id, :name, :category, :topic)
        end
    end

    categories << channel.category
end

json.categories do
    json.array! categories.uniq
end

if @channel
    json.channel do
        json.extract!(@channel, :id, :name, :category, :topic)
    end
end