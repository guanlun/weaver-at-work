class SuperuserController < ApplicationController
  def login
  end

  def interface
    if session[:key] and session[:key] == @@session_key
      render "interface"
    else
      redirect_to :action => "login"
    end
  end

  def auth
    if params[:login] == "weaverpassmobai"
      @@session_key = (0...50).map do
        ('a'..'z').to_a[rand(26)]
      end.join
      session[:key] = @@session_key
      render :text => "success"
    else
      render :text => "wrong"
    end
  end

  def upload_picture
    logger.debug '----------------------------------------'
    logger.debug params
    logger.debug '----------------------------------------'

    uploaded = params[:image]
    filename = uploaded.original_filename
    path = "#{Rails.root}/public/uploads/#{filename}"

    begin
      file = File.open(path, "w")
      file.write uploaded.read
      render :text => 'success'
    rescue
      render :text => 'fail'
    end
  end

  @@session_key = nil
end
