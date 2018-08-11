class User < ApplicationRecord
	has_many :negas, dependent: :destroy
	has_many :films, dependent: :destroy
end
