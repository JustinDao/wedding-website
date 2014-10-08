require 'sinatra'
require 'haml'

get '/' do
  erb :index
end

not_found do
  halt 404, 'page not found'
end