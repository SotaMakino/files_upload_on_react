require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
  end

  test 'valid user' do
    assert @user.valid?
  end

  test 'invalid without a name' do
    @user.name = nil
    refute @user.valid?
    assert_not_nil @user.errors[:name]
  end

  test 'invalid without a login' do
    @user.login = nil
    refute @user.valid?
    assert_not_nil @user.errors[:login]
  end

  test 'invalid if login already exists' do
    user = User.new(login: @user.login, name: 'Someone Else')
    refute user.valid?
    assert_not_nil user.errors[:login]
  end

  test '#negas' do
    assert_equal 2, @user.negas.size
  end

end