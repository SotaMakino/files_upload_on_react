import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
	<Routes />
    </ThemeProvider>,
	document.getElementById('root')
	);
registerServiceWorker();