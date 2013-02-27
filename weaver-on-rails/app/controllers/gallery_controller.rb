class GalleryController < ApplicationController
  def list
    @galleries = Gallery.all
  end

  def show
    @gallery = Gallery.find params[:id]
  end

  def add_comment
    @gallery = Gallery.find params[:id].to_i
    comment = @gallery.gallery_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end
end
