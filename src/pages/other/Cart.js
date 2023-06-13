import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToGift, decreaseQuantityGift } from "../../redux/actions/giftActions";


const Cart = ({
  location,
  cartItemsNotPersonnalized,
  cartItemsPersonnalised,
  currency,
  decreaseQuantity,
  decreaseQuantityGift,
  addToCart,
  addToGift,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;

  // console.log(cartItems);
  var cartItems = cartItemsNotPersonnalized.concat(cartItemsPersonnalised)



  


//   function getCartItems(){
//       if(cartItemsPersonnalised.length>0 && cartItemsNotPersonnalized.length >0){

//     if(cartItemsNotPersonnalized[0].gift.id ===cartItemsPersonnalised[0].gift.id){
//       const tab = []
//       tab.push({cartItemsNotPersonnalized,cartItemsPersonnalised})
//       console.log(tab)
//       cartItems = [{
//         cartItemId: tab[0].cartItemsNotPersonnalized[0].cartItemId,
//         gift: tab[0].cartItemsNotPersonnalized[0].gift,
//         product:[
//           tab[0].cartItemsNotPersonnalized[0].product,
//           tab[0].cartItemsPersonnalised[0].product[0]
//         ],
//         quantity: 1
//       }]
//       console.log(cartItems)
//     }else if(cartItemsNotPersonnalized[0].gift.id !== cartItemsPersonnalised[0].gift.id){
//       const tab = []
//       tab.push({cartItemsNotPersonnalized,cartItemsPersonnalised})
//       console.log(tab)
//       return cartItems = tab
  
//     }

    
//  }else{

//   if(cartItemsPersonnalised.length>0){
//     console.log(cartItems)
//     return cartItems = cartItemsPersonnalised;
//   }else if(cartItemsNotPersonnalized.length >0) {
//     console.log(cartItems)
//     return cartItems = cartItemsNotPersonnalized
//   }

//  }
// }

// getCartItems()





console.log(cartItems)

  

  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Mon Panier</title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mon Panier
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Mes Sélections</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Nom Produit</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {

                            // console.log(cartItem)

                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );

                            // const Price =  cartItem.gift.price;

                            const finalProductPrice = (
                              cartItem.gift.price
                            );

                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.gift.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        
                                        process.env.PUBLIC_URL +
                                      "/assets/img/gifty_animated_2.gif"
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.gift.id
                                    }
                                  >
                                    {cartItem.gift.title}
                                  </Link>
                                  {/* {cartItem.selectedProductColor &&
                                  cartItem.selectedProductSize ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {cartItem.selectedProductColor}
                                      </span>
                                      <span>
                                        Size: {cartItem.selectedProductSize}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )} */}
                                </td>

                                <td className="product-price-cart">
                                 
                                    <span className="amount">
                                      {
                                        finalProductPrice + "F CFA"}
                                    </span>
                                  
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">

                                  { cartItem.custumize==="true" ? (
                                    <>
                                      <button
                                      className="dec qtybutton"

                                      onClick={() =>
                                        decreaseQuantityGift(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        
                                        addToGift(
                                          cartItem,
                                          addToast,
                                          quantityCount                       
                                          )
                                      }
                                      

                                    >
                                      +
                                    </button>
                                    </>
                                  ):(
                                    <>
                                    <button
                                    className="dec qtybutton"

                                    onClick={() =>
                                      decreaseQuantity(cartItem, addToast)
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    type="text"
                                    value={cartItem.quantity}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      
                                      addToCart(
                                        cartItem,
                                        addToast,
                                        quantityCount
                                      )
                                    }
                                    

                                  >
                                    +
                                  </button>
                                  </>
                                  )}
                                    
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? 
                                      (
                                        finalDiscountedPrice * cartItem.quantity
                                      )
                                    : 
                                      (
                                        finalProductPrice * cartItem.quantity
                                      )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/gift"}
                        >
                          Ajouter 
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Effacer Panier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                        Total Panier 
                        </h4>
                      </div>
                      <h5>
                        Total de Cadeau(x) {" "}
                        <span>

                          {cartItems.length}
                          {/* {cartTotalPrice.toFixed(2)} */}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                         Total{" "}
                        <span>
                          {cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Passer au paiement
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                     Aucun article dans " Mon Panier " <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Ajouter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <br />
        </div>
      </LayoutOne>
      
      
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  addToGift: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  decreaseQuantityGift: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItemsNotPersonnalized: state.cartData,
    currency: state.currencyData,
    cartItemsPersonnalised: state.giftData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToGift: (item, addToast, quantityCount) => {
      dispatch(addToGift(item, addToast, quantityCount))
    },
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    decreaseQuantityGift: (item, addToast)=>{
      dispatch(decreaseQuantityGift(item,addToast))
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
