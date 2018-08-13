require 'bundler/setup'
require 'dotenv'

Dotenv.load ".env"

puts ENV["FLASHCARDS_CLIENT_URL"]