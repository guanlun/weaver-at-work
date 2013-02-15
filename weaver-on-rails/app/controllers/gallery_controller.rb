class GalleryController < ApplicationController
  def list
    @galleries = Gallery.all
  end

  def show
  end
end
