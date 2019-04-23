import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/responsiveness/index.css'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'
ReactDOM.render(<Provider store={store}><PersistGate persistor={persistor}><App /></PersistGate></Provider>, document.getElementById('root'));

