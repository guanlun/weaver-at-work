class TextController < ApplicationController
  def list
    @texts = Text.order(:created_at).reverse
  end

  def show
    @text = find_text_by_path(params[:path])
  end

  def add_comment
    @text = find_text_by_path(params[:path])
    if params[:name].length * params[:content].length != 0
      comment = @text.text_comments.create :name => params[:name], :content => params[:content]
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_text_by_path(path)
      path = path.gsub '_', ' '
      Text.all.each do |t|
        return t if t.title.downcase == path
      end
    end
end
