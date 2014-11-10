require 'sinatra'
require 'haml'

get '/' do
  erb :index
end

get '/info' do
  erb :info
end

not_found do
  halt 404, 'page not found'
end