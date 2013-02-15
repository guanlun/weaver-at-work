class ProjectController < ApplicationController
  def list
    @projects = Project.all
  end

  def show
  end
end
