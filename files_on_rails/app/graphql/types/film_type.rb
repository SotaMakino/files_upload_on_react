require 'graphql/batch'
Types::FilmType = GraphQL::ObjectType.define do
  name 'Film'

  field :id, !types.ID

  field :nega, Types::NegaType do
    resolve lambda { |obj, _args, _ctx|
      obj.nega
    }
  end


end