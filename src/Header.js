import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  handleClickLogOut() {
    window.location.href = window.location.href.replace(/\?.*$/, '');
  }

  render() {

    return (
      <AppBar title='Negabook'>
        <Navigation type='horizontal'>
          <Link to='/' className='Header-link'>Home</Link>
          <Link to='/negas' className='Header-link'>Negative Films</Link>
        </Navigation>
        <div>version 0.2</div>
      </AppBar>
    );
  }
}

export default Header;