import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {App} from './App';
import reportWebVitals from "./reportWebVitals";
import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/paper-kit.scss?v=1.3.0";
import "./assets/demo/demo.css?v=1.3.0";
import { Provider } from 'react-redux';

import { store } from './_helpers';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
