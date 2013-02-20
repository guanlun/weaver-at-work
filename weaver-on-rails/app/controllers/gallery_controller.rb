class GalleryController < ApplicationController
  def list
    @galleries = Gallery.all
  end

  def show
    @gallery = Gallery.find params[:id]
  end
end
