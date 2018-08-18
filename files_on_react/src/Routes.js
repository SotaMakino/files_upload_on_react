import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Header from './Header';
import * as axios from './axiosClient';
import './Routes.css';

const history = createBrowserHistory();

class Routes extends Component {

  constructor() {
    super();

    const params = axios.getQueryParams();
    this.state = {
     token: params.token,
     info: null
   };

  }

  fetchUserDetails() {
    axios.fetchUserDetails({ token: this.state.token })
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


export default Routes;