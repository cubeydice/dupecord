class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save!
      render :show
    else
      render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    @channel.destroy!
  end

  private
  def channel_params
    params.require(:channel).permit(:name)
  end
end
