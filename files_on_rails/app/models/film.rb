class Film < ApplicationRecord
  belongs_to :user
  belongs_to :nega, inverse_of: :films
  has_attached_file \
    :photo,
    styles: { thumb: ['32x32#', 'jpg'] },
    convert_options: {
      all: '-interlace Plane'
    },
    default_url: './public/noimage_article.png'

  validates_attachment_presence :photo
  validates_attachment_file_name :photo, matches: [/png|PNG\Z/, /jpe?g|JPE?G\Z/, /gif|GIF\Z/]
end
