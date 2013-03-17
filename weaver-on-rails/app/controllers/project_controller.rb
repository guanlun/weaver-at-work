class ProjectController < ApplicationController
  def list
    @projects = Project.order(:created_at).reverse
  end

  def show
    @project = find_project_by_path(params[:path])
  end

  def add_comment
    @project = find_project_by_path(params[:path])
    if params[:name].length * params[:content].length != 0
      comment = @project.project_comments.create :name => params[:name], :content => params[:content]
    end

    redirect_to :action => "show", :id => params[:id]
  end

  private
    def find_project_by_path(path)
      path = path.gsub '_', ' '
      Project.all.each do |p|
        return p if p.title.downcase == path
      end
    end
end
