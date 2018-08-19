import React, { Component } from 'react';
import Routes from './Routes.js';
import Login from './Auth/Login';
import * as axios from './axiosClient';

class App extends Component {

  constructor() {
    super();

    const params = axios.getQueryParams();
    this.state = { token: params.token };
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  render() {
    return(
      <div className='App'>
        {this.isLoggedIn()
          ? <Routes token={this.state.token} />
          : <Login />
         }
      </div>
    );
  }

}


export default App;