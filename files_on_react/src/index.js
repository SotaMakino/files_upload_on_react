import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	<Home />
    </ThemeProvider>,
	document.getElementById('root')
	);
registerServiceWorker();