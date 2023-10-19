class Api::ChannelsController < ApplicationController
  wrap_parameters include: Channel.attribute_names

  def create
    @channel = Channel.new(channel_params)
    @server = Server.find_by(id: @channel.server_id)

    if (@channel.server.owner_id === current_user.id)
      if @channel.save!
        render 'api/servers/show'
      else
        render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Unauthorized, user does not have permission to create channels in this server" }, status: :unauthorized
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])

    if @channel
      if (@channel.server.owner_id === current_user.id)
        if @channel.update(channel_params)
          render 'api/servers/show'
        else
          render json: { errors: @channel.errors.full_messages }
        end
      else
        render json: { errors: "Unauthorized, user does not have permission to update the channel" }, status: :unauthorized
      end
    else
      render json: {errors: "Channel not found"}, status: 404
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    server = Server.find_by(id: @channel.server_id)

    if @channel
      if (@channel.server.owner_id === current_user.id)
        @channel.destroy!
        render json: nil
      else
        render json: {errors: 'Unauthorized, user does not have permission to delete channel'}, status: :unauthorized
      end
    else
      render json: {errors: "Channel not found"}, status: 404
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:id, :name, :category, :topic, :server_id)
  end
end
