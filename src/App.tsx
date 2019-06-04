import * as React from "react";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import NegaList from "./List";
import NegaEdit from "./Edit";
import Main from "./Main";
import Header from "./Header";
import Details from "./Details";
import NegaNew from "./New";

export default class App extends React.Component {
  public render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Header />
          <Switch>
            <Route path="/negas/:id/edit" component={NegaEdit} />
            <Route path="/negas/details/:id" component={Details} />
            <Route path="/negas/new" component={NegaNew} />
            <Route path="/negas/" component={NegaList} />
            <Route path="*" component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}
