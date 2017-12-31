import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/containers/App';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(<App />, document.getElementById('app'));


if (module.hot) {
    module.hot.accept('./components/containers/App', () => {
      const NextApp = require('./components/containers/App').default;
      ReactDOM.render(
              <AppContainer>
                  <NextApp />
              </AppContainer>,
        document.getElementById('app')
      );
    });
  }