class Api::MessagesController < ApplicationController
    before_action :require_logged_in
    wrap_parameters include: Message.attribute_names

    def create
        @message = Message.new(message_params)
        @message.user_id = current_user.id

        if @message.save
          render json: :show
        else
          render json: {errors: @message.errors.full_messages}, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        @user = current_user

        if @message.user_id === @user.id
            if @message.update(message_params)
              render :show
            else
              render json: {errors: @message.errors.full_messages}, status: 422
            end
        else
            render json: {errors: "Unauthorized, user does not have permission to update message"}, status: :unauthorized
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @user = current_user

        if @message.user_id === @user.id
            @message.destroy
        end

        render json: nil
    end

    private
    def message_params
      params.require(:message).permit(:content, :user_id, :messageable_id, :messageable_type)
    end
end
