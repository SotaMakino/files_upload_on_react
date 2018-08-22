import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	  <App />
	</ThemeProvider>,
	document.getElementById('root')
  );