class Nega < ApplicationRecord
  validates :type, presence: true
  validates :description, presence: true

  has_many :films, dependent: :destroy
  accepts_nested_attributes_for :films, allow_destroy: true

  def as_json(_opts = {})
    {
      id: id,
      type: type,
      description: description,
      errors: errors,
      film_photos: filmss.map do |x|
        {
          url: x.photo.url.absolute_url,
          name: x.photo_file_name,
          id: x.id
        }
      end
    }
  end
end
