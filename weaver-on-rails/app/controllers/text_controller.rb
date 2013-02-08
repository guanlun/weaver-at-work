class TextController < ApplicationController
  def list
    @texts = Text.all.reverse
  end

  def show
    @text = Text.find params[:id]
  end
end
