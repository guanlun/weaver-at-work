class TextController < ApplicationController
  def list
    @texts = Text.all.reverse
  end

  def show
    @text = Text.find params[:id]
  end

  def add_comment
    @text = Text.find params[:id].to_i
    comment = @text.text_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end
end
