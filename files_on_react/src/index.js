import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import Routes from './Routes.js';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	  <Routes />
    </ThemeProvider>,
	document.getElementById('root')
);

registerServiceWorker();