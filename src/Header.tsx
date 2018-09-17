import * as React from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => 
  <AppBar title='Negabook'>
    <Navigation type='horizontal'>
      <Link to='/' className='Header-link'>Home</Link>
      <Link to='/negas' className='Header-link'>Negative Films</Link>
    </Navigation>
    <div>version 1.0</div>
  </AppBar>

export default Header;