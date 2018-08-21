import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Link from 'react-toolbox/lib/link/Link';
import './Header.css';

class Header extends Component {
  handleClickLogOut() {
    window.location.href = window.location.href.replace(/\?.*$/, '');
  }

  render() {

    return (
      <AppBar title='Negabook'>
        <Navigation type='horizontal'>
          <Link
            href='/negas'
            active
            label='Negative Films'
            icon='exit_to_app'
            className='Header-link'
          />
        </Navigation>
      </AppBar>
    );
  }
}

export default Header;