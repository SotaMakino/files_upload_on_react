import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import NegaIndex from './Nega/Index';
import NegaNew from './Nega/New';
import NegaEdit from './Nega/Edit';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Header from './Header';

const history = createBrowserHistory();
const Routes = () =>
  <Router history={history}>
    <div>
    <Header/>
    <Switch>
      <Route path="/negas/:id/edit" component={NegaEdit} />
      <Route path="/negas/new" component={NegaNew} />
      <Route path="/negas/" component={NegaIndex} />
      <Route path="*" component={Welcome} />
    </Switch>
    </div>
  </Router>;

export default Routes;