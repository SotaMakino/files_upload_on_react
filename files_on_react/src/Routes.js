import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import NegaIndex from './Nega/Index';
import NegaNew from './Nega/New';
import NegaEdit from './Nega/Edit';
import NotFound from './NotFound';

const history = createBrowserHistory();
const Routes = () =>
  <Router history={history}>
    <Switch>
      <Route path="/negas/:id/edit" component={NegaEdit} />
      <Route path="/negas/new" component={NegaNew} />
      <Route path="/negas/" component={NegaIndex} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>;

export default Routes;