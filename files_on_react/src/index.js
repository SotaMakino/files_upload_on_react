import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import Routes from './Routes.js';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	<Home />
    </ThemeProvider>,
	document.getElementById('root')
	);
registerServiceWorker();