import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";



const store = createStore(
        rootReducer,
        load(),
        composeWithDevTools(applyMiddleware(thunk, save()))
      );

export default store