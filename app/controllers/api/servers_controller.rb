class Api::ServersController < ApplicationController
  def index
    @user = current_user

    if @user
      render :show
    else
      render json: { user: nil }
    end
  end

  def show
    @server = Server.find_by(id: params[:id])

    if @server
        render :show
    else
        render json: { user: nil }
    end
  end

  def create
    @server = Server.new(server_params)

    if @server.save!
      render :show
    else
      render json: { errors: @server.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @server = Server.find_by(id: params[:id])
    @server.destroy!
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    @server.destroy!
  end

  private
  def server_params
    params.require(:server).permit(:name)
  end
end
