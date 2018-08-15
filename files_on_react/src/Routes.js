import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import NegaIndex from './Nega/Index';
import NegaNew from './Nega/New';
import NegaEdit from './Nega/Edit';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Header from './Header';
import { getQueryParams } from './utils';
import './Routes.css';


class Routes extends Component {

  constructor() {
    super();

    const params = getQueryParams();
    this.state = { token: params.token };
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  render() {
    return(
      <div className='Routes'>
        {this.isLoggedIn()
          ? <Router token={this.state.token} history={history}>
              <div>
              <Header/>
              <Switch>
                <Route path="/negas/:id/edit" component={NegaEdit} />
                <Route path="/negas/new" component={NegaNew} />
                <Route path="/negas/" component={NegaIndex} />
                <Route path="*" component={Welcome} />
              </Switch>
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