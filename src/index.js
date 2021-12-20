import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

import './static/style/reset.css'
import './static/style/base.css'
import "antd/dist/antd.css";

import { createStore } from 'redux'
import { Provider } from "react-redux";
import SkuReducer from './Store/Reducers/Sku.Reducer'

const store = createStore(SkuReducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App/>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);
