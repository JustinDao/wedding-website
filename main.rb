require 'sinatra'
require 'config_env'

ConfigEnv.path_to_config("#{__dir__}/config/config_env.rb")

# https://stackoverflow.com/questions/26896375
use Rack::Session::Pool 

helpers do
  def logged_in?
    session["is_logged_in"] == true
  end
end

before do
  pass if request.path_info.split('/')[1] == 'login'

  if not logged_in?
    redirect '/login'
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
    redirect '/'
  else
    halt 401
  end
end

get '/logout' do
  session["is_logged_in"] = false 
  redirect '/'
end

get '/' do
  erb :index
end

get '/details' do
  erb :details
end

get '/hotels' do
  erb :hotels
end

not_found do
  halt 404, 'page not found'
end