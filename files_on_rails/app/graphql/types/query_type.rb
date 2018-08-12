Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.


  field :films, !types[Types::FilmType] do
    resolve lambda { |_obj, _args, ctx|
      Film.all
    }
  end
end
