import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import NegaList from './List';
import NegaNew from './New';
import NegaEdit from './Edit';
import Main from './Main';
import Header from './Header';

const history = createBrowserHistory();
const App = () =>
  <Router history={history} basename={process.env.PUBLIC_URL}>
    <div>
      <Header/>
        <Switch>
          <Route path="/negas/:id/edit" component={NegaEdit} />
          <Route path="/negas/new" component={NegaNew} />
          <Route path="/negas/" component={NegaList} />
          <Route path="*" component={Main} />
        </Switch>
    </div>
  </Router>

export default App;