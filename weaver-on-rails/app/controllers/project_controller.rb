class ProjectController < ApplicationController
  def list
    @projects = Project.all
  end

  def show
    @project = Project.find params[:id]
  end

  def add_comment
    @project = Project.find params[:id].to_i
    comment = @project.project_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end
end
