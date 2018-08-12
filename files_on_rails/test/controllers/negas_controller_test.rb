require 'test_helper'

class NegasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @token = TokiToki.encode(@user.login)
    @nega = @user.negas.first
  end

  test "should get index" do
    get negas_url, as: :json
    assert_response :success
  end

  test "should create nega" do
    assert_difference('Nega.count') do
      post negas_url, params: {
        token: @token,
        nega: {
          title: @nega.title,
          description: @nega.description,
          user_id: @nega.user_id
        }
      }, as: :json
    end

    assert_response 201
  end

  test "should show nega" do
    get nega_url(@nega), params: {
      token: @token
    }
    assert_response :success
  end

  test "should update nega" do
    patch nega_url(@nega), params: { nega: {  } }, as: :json
    assert_response 200
  end

  test "should destroy nega" do
    assert_difference('Nega.count', -1) do
      delete nega_url(@nega), as: :json
    end

    assert_response 204
  end
end
