require 'test_helper'

class NegaTest < ActiveSupport::TestCase
  
  def setup
    @nega = negas(:one)
  end

  test 'valid nega' do
    assert @nega.valid?
  end

  test 'invalid without title' do
    nega = Nega.new(user: @nega.user, title: 'title 1')
    refute nega.valid?
    assert_not_nil nega.errors[:description]
  end

  test 'invalid without description' do
    nega = Nega.new(user: @nega.user, description: 'description 1')
    refute nega.valid?
    assert_not_nil nega.errors[:title]
  end

end
