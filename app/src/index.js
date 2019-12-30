import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import "bootstrap/dist/css/bootstrap.css";
import thunk from "redux-thunk";
//Components
import './styles.css'
import NavBar from "./components/navbar";
import Router from './router'
import {loadState,saveState} from './localStorage'
function App() {
  return (
    <div className="container">
      <NavBar />
      <Router />
      <div className="row">{/* <MovieSearch />
        <Pagination /> */}</div>
    </div>
  );
}

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(
//   allReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const persistedState = loadState();


let store = createStore(
  allReducers,
  // applyMiddleware(thunk),
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
