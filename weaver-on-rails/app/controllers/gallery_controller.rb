class GalleryController < ApplicationController
  def list
    @galleries = Gallery.order(:created_at).reverse
  end

  def show
    @gallery = find_gallery_by_path(params[:path])
  end

  def add_comment
    @gallery = find_gallery_by_path(params[:path])
    if params[:name].length * params[:content].length != 0
      comment = @gallery.gallery_comments.create :name => params[:name], :content => params[:content]
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_gallery_by_path(path)
      path = path.gsub '_', ' '
      Gallery.all.each do |g|
        return g if g.title.downcase == path
      end
    end
end
