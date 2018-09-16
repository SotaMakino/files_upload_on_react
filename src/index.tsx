import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import App from './App';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	  <App />
	</ThemeProvider>,
	document.getElementById('root') as HTMLElement
);