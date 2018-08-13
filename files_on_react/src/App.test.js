import React from 'react';
import { shallow } from 'enzyme';
import Routes from './Routes';
import Login from './Auth/Login';

describe('Routes', () => {
  let wrapper;

  describe('without a token param', () => {
    beforeEach(() => {
      wrapper = shallow(<Routes />);
    });

    it('renders a Login view', () => {
      expect(wrapper.find(Login)).toHaveLength(1);
    });
  });

  describe('with a token param', () => {
    beforeEach(() => {
      wrapper = shallow(<Routes />);
      wrapper.setState({token: 'foobar'});
    });

    it('does not render a Login view', () => {
      expect(wrapper.find(Login)).toHaveLength(0);
    });

  });
});