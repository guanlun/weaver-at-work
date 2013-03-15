class ProjectController < ApplicationController
  def list
    @projects = Project.all
  end

  def show
    @project = find_project_by_path(params[:path])[0]
  end

  def add_comment
    @project = find_project_by_path(params[:path])[0]
    comment = @project.project_comments.create
    comment.name = params[:name]
    comment.content = params[:content]

    if comment.valid?
      comment.save
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_project_by_path(path)
      path = path.gsub '_', ' '
      Project.all do |p|
        return p if p.title.downcase == path
      end
    end
end
