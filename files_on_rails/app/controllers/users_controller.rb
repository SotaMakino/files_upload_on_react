class UsersController < ApplicationController
  before_action :authenticate_user!

  # GET /users/1
  def show
    render json: @current_user
  end

end
