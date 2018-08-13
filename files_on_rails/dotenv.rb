require 'bundler/setup'
require 'dotenv'

Dotenv.load ".env"

puts ENV["JWT_SECRET"]