class NegasController < ApplicationController
  before_action :authenticate_user!
  before_action :set_nega, only: [:show, :update, :destroy]
  
  # GET /negas
  def index
    @negas = @current_user.negas

    render json: @negas
  end

  # GET /negas/1
  def show
    render json: @nega
  end

  # POST /negas
  def create
    @nega = Nega.new(nega_params)

    if @nega.save
      render json: @nega, status: :created, location: @nega
    else
      render json: @nega.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /negas/1
  def update
    if @nega.update(nega_params)
      render json: @nega
    else
      render json: @nega.errors, status: :unprocessable_entity
    end
  end

  # DELETE /negas/1
  def destroy
    @nega.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_nega
    @nega = @current_user.negas.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def nega_params
    params.require(:nega).permit(
      [
        :title,
        :description,
        films_attributes: %I[
          id
          photo
          _destroy
        ]
      ]
    )
  end
end
