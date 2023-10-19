class Api::ServersController < ApplicationController
  wrap_parameters include: Server.attribute_names

  def index
    @user = current_user

    if @user
      render :index
    else
      render json: { user: nil }
    end
  end

  def show
    @user = current_user
    @server = Server.find_by(id: params[:id])

    if @server
        render :show
    else
        render json: { errors: "Server not found" }, status: 404
    end
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id

    if @server.save!
      UserServer.create!({user_id: current_user.id, server_id: @server.id})
      Channel.create!({server_id: @server.id, name: "General", category: "General"})
      render :show
    else
      render json: { errors: @server.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @server = Server.find_by(id: params[:id])

    if @server
      if @server.owner_id === current_user.id
        if @server.update(server_params)
          render :show
        else
          render json: { errors: @server.errors.full_messages }
        end
      else
        render json: { errors: "Unauthorized, user does not have permission to update server" }, status: :unauthorized
      end
    else
      render json: { errors: "Server not found" }, status: 404
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])

    if @server
      if @server.owner_id === current_user.id
        @server.destroy!
        render json: nil
      else
        render json: {errors: "Unauthorized, user does not have permissioin to delete server" }, status: :unauthorized
      end
    else
      render json: nil
    end
  end

  private
  def server_params
    params.require(:server).permit(:name, :owner_id, :server_icon)
  end
end
