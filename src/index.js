import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './assets/styles/normalize.css'
import './assets/fontello/css/fontello.css'
import './assets/styles/index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(<Provider store={store}><PersistGate persistor={persistor}><App /></PersistGate></Provider>, document.getElementById('root'));
