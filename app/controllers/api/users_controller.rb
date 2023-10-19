class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save!
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find_by(id: params[:id])

    if @user
        render :show
    else
        render json: { user: nil }
    end
  end

  def update
    @user = current_user
    render :show
  end

  def destroy
    @user = current_user
    @user.destroy!
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end

end
