import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/js/axiosConfig';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
