class Mutations::LoggedInUser < GraphQL::Function
  # define the arguments this field will receive
  argument :email, !Types::AuthInput

  # define what this field will return
  type Types::AuthType

  # resolve the field's response
  def call(_obj, args, _ctx)
    input = args[:email]
    return unless input

    user = User.find_by(email: args[:email])
    return unless user
    return unless user.authenticate(args[:password])

    OpenStruct.new(jwt: AuthToken.token(user),
                   user: user)
  end
end