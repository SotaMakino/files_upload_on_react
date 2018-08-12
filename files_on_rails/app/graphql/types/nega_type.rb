require 'graphql/batch'
Types::NegaType = GraphQL::ObjectType.define do
  name 'Nega'

  field :id, !types.ID
  field :title, !types.String
  field :description, !types.String
end