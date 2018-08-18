import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import App from './App.js';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	  <App />
    </ThemeProvider>,
	document.getElementById('root')
);

registerServiceWorker();