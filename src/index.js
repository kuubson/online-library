import React from 'react';
import ReactDOM from 'react-dom';
import './fontello/css/fontello.css'
import './styles/index.css';
import './styles/responsiveness/responsiveness.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { setEmail } from './actions/user'

window.store = store;
window.setEmail = setEmail;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

