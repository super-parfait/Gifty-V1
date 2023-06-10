import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import orderReducer from "./orderReducer"
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import auth from "./auth";
import message from "./message";
import giftReducer from "./giftReducer";
import newGiftReducer from "./newGiftReducer";
// import productsSearch from "./productReducer"

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  giftData: giftReducer,
  giftPersonnalized: newGiftReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  auth,
  message,
  orderData:orderReducer
  // search:productsSearch
});

export default rootReducer;
