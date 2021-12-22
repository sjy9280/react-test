import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import './static/style/reset.css'
import './static/style/base.css'
import "antd/dist/antd.css";


import { Provider } from "react-redux";
import store from './Store/store'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App/>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
