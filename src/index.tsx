import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import * as theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import App from './App';
import './index.css';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory()

ReactDOM.render(
	<ThemeProvider theme={theme}>
	  <Router history={history}>
	    <App />
		</Router>
	</ThemeProvider>,
	document.getElementById('root') as HTMLElement
);