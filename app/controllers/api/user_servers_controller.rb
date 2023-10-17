class Api::UserServersController < ApplicationController
    def create
        @user_server = UserServer.new(user_server_params)
        @user_server.user_id = current_user_id

        if @user_server.save
            @server = @user_server.server
            render 'api/servers/show'
        else
            @server = UserServer.find_by(user_server_params, user_id: current_user.id)
            if @user_server
                render 'api/servers/show'
            else
                render json: { errors: @user_server.errors.full_messages}, status: 422
            end
        end
    end


    def destroy
        @user_server = UserServer.find_by(user_id: current_user.id, server_id: params[:id])
        if @user_server
            @user_server.destroy!
        end
        render json: nil
    end

    private
    def user_server_params
      params.require(:user_server).permit(:user_id, :server_id)
    end
end
