class Api::SessionsController < ApplicationController
	before_action :require_logged_out, only: [:create]
	before_action :require_logged_in, only: [:destroy]

	def show
		@user = current_user
		if @user
      render json: 'hi'
    else
      render json: 'bad'
    end
	end

	def create
		@user = User.find_by_credentials(params[:credential], params[:password])

		if @user
			login!(@user)
			render json: 'hi'
		else
			render json: { errors: ['Invalid credentials'] }, status: :unauthorized
		end
	end

	def destroy
		userID = current_user.id
		logout!
		render json: 'bye'
	end
end
