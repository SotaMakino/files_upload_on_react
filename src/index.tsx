import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import * as theme from "./toolbox/theme";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import createBrowserHistory from "history/createBrowserHistory";
import App from "./App";
import "./index.css";

const history = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root") as HTMLElement
);
