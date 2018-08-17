import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Welcome from './Welcome';
import Login from './Auth/Login';
import Header from './Header';
import { getQueryParams } from './utils';
import * as utils from './utils';

import './Routes.css';


class Routes extends Component {

  constructor() {
    super();

    const params = getQueryParams();
    this.state = {
     token: params.token,
     info: null
   };

  }

  fetchUserDetails() {
    utils.fetchUserDetails({ token: this.state.token })
      .then(info => {
        this.setState({ info })
      });
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  render() {
    const { info } = this.state;
    return(
      <div className='Routes'>
        {this.isLoggedIn()
          ? <Router history={history}>
              <div>
                <Header info={info}/>
                <Welcome/>
              </div>
            </Router>
          : <Login />
         }
      </div>
    );
  }

}

const history = createBrowserHistory();


export default Routes;