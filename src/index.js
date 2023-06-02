import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import {Router} from "react-router-dom";
import history from './utils/history';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import { fetchUserData } from "./redux/actions/auth";
// import rootReducer from "./redux/reducers/rootReducer";
import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store"
import { ToastProvider } from 'react-toast-notifications';






// fetch products from json file
store.dispatch(fetchProducts(products));

store.dispatch(fetchUserData())

ReactDOM.render(
  <Router history={history}>
      <Provider store={store}>
        <ToastProvider>
          <App />
        </ToastProvider> 
      </Provider>
  </Router>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
