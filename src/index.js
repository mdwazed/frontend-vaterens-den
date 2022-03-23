import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'


import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/index.css' // Bootstrap CSS

import Layout from './components/layout/Layout'
import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1' // the prefix of the URL
axios.defaults.headers.get['Accept'] = 'application/json'   // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json'  // default header for all POST request



document.title = 'Veterans Dens'

ReactDOM.render(
    <React.StrictMode>
        <Layout />
    </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
