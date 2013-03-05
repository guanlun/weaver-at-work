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
      render :text => "fail"
    end
  end

=begin
  def upload_picture
    uploaded = params[:image]
    filename = params[:filename]
    title = params[:title]
    description = params[:description]

    path = "#{Rails.root}/public/uploads/#{filename}"

    begin
      File.open(path, "wb") do |f|
        f.write(uploaded.read)
        f.close
      end
    rescue
      render :text => 'file cannot be uploaded'
    end

    p = Picture.new(:link => path, :title => title, :description => description)

    if p.valid?
      p.save
      render :text => 'success'
    else
      render :text => 'database erro'
    end
  end
=end

  def create_gallery
    g = Gallery.new(:title => params[:title], :description => params[:description])

    params.keys.each do |k|
      if is_int params[k] # images selected
        g.pictures << Picture.find(k)
      end
    end

    if g.valid?
      g.save
      render :text => 'success'
    else
      render :text => 'invalid gallery'
    end

  end

  @@session_key = nil

  private
    def is_int(str)
      return !!(str =~ /^[-+]?[0-9]+$/)
    end
end
