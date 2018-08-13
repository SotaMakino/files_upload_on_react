import React, { Component } from 'react';
import { getQueryParams } from './utils';
import Login from './Auth/Login';
import Routes from './Routes';
import './Home.css';

class Home extends Component {
  constructor() {
    super();

    const params = getQueryParams();
    this.state = { token: params.token };
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  render() {
    return (
      <div className='Home'>
        {this.isLoggedIn()
          ? <Routes token={this.state.token} />
          : <Login />
        }
      </div>
    );
  }
}

export default Home;