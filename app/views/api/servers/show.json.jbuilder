json.server do
    json.extract!(@server, :id, :name, :owner_id, :server_icon, :channels)
end

channels = @server.channels
categories = {}

channels.each do |channel|
    json.channels do
        json.set! channel.id do
            json.extract!(channel, :id, :name, :category, :topic)
        end
    end
end