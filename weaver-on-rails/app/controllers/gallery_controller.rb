class GalleryController < ApplicationController
  def list
    @galleries = Gallery.all
  end

  def show
    @gallery = find_gallery_by_path(params[:path])[0]
  end

  def add_comment
    @gallery = find_gallery_by_path(params[:path])[0]
    comment = @gallery.gallery_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_gallery_by_path(path)
      path = path.gsub '_', ' '
      Gallery.all do |g|
        return g if g.title.downcase == path
      end
    end
end
