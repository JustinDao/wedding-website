require 'sinatra'
require 'config_env'
require 'digest'
require 'data_mapper' 

ConfigEnv.path_to_config("#{__dir__}/config/config_env.rb")
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/wedding.db")

# https://stackoverflow.com/questions/26896375
use Rack::Session::Pool, :expire_after => 2592000

# Needed for shotgun?
# http://stackoverflow.com/questions/9827151/shotgun-everytime-got-new-sessions-cant-store-datain-sessions
enable :sessions
set :session_secret, ENV['session_secret']

helpers do
  def logged_in?
    session["is_logged_in"] && session["password"] == Digest::MD5.hexdigest(ENV['login_password'])
  end

  def sanitize(text)
    Rack::Utils.escape_html(text)
  end

end

before do
  pass if request.path_info.split('/')[1] == 'login'

  if not logged_in?
    session["password"] = nil
    session["is_logged_in"] = false
    redirect '/login'
  else
    session["is_logged_in"] = true
  end
end

get "/login" do
  if logged_in?
    redirect '/'
  else
    erb :login
  end
end

post '/login' do
  if params['password'] == ENV['login_password']
    session["is_logged_in"] = true
    session["password"] = Digest::MD5.hexdigest ENV['login_password']
    redirect '/'
  else
    redirect '/login'
  end
end

get '/logout' do
  session["is_logged_in"] = false 
  session["password"] = nil
  redirect '/'
end

get '/' do
  @posts = Post.all.reverse
  erb :index
end

post '/post' do
  name = params[:guestbook_name]
  body = params[:guestbook_body]

  Post.create(name: name, body: body)

  redirect '/'
end

not_found do
 status 404
 erb :page404
end

# Models

class Post
  include DataMapper::Resource

  property :id,         Serial    # An auto-increment integer key
  property :name,       String    # A varchar type string, for short strings
  property :body,       Text      # A text block, for longer string data.
  property :created_at, DateTime  # A DateTime, for any date you might like.
end

# http://stackoverflow.com/questions/1081926/how-do-i-format-a-date-in-ruby-to-include-rd-as-in-3rd
class Fixnum
  def ordinalize
    if (11..13).include?(self % 100)
      "#{self}th"
    else
      case self % 10
        when 1; "#{self}st"
        when 2; "#{self}nd"
        when 3; "#{self}rd"
        else    "#{self}th"
      end
    end
  end
end


DataMapper.finalize
Post.auto_upgrade!