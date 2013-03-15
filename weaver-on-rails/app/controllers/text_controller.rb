class TextController < ApplicationController
  def list
    @texts = Text.all.reverse
  end

  def show
    @text = find_text_by_path(params[:path])[0]
  end

  def add_comment
    @text = find_text_by_path(params[:path])[0]
    comment = @text.text_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_text_by_path(path)
      path = path.gsub '_', ' '
      Text.all do |t|
        return t if t.title.downcase == path
      end
    end
end
