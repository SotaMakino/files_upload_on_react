class User < ApplicationRecord
	has_many :negas, dependent: :destroy
	has_many :films, dependent: :destroy

	validates :name, presence: true
    validates :login, presence: true, uniqueness: true
end
