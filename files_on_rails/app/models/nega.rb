class Nega < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :films, dependent: :destroy
  accepts_nested_attributes_for :films, allow_destroy: true

  def as_json(_opts = {})
    {
      id: id,
      title: title,
      description: description,
      errors: errors,
      film_photos: films.map do |x|
        {
          url: x.photo.url.absolute_url,
          name: x.photo_file_name,
          id: x.id
        }
      end
    }
  end
end
