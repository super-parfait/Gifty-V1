import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import { decreaseQuantityGift } from "../../../redux/actions/giftActions";

const MenuCart = ({ cartData,giftData, deleteFromCart }) => {
  let cartTotalPrice = 0;

  // var cartDataFinal = cartData.concat(giftData)

  
  // console.log(cartDataFinal)

  const { addToast } = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single.gift.price,
                
              );
              const finalProductPrice = (
                single.gift.price
              );
              const finalDiscountedPrice = (
                discountedPrice
              );

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single.quantity)
                : (cartTotalPrice += finalProductPrice * single.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + single.gift.id}>
                      {
                        single.product.image  ? (
                          <img
                            alt=""
                            src={single.product.image}
                            className="img-fluid"
                          />
                        ):(
                          <img
                            alt=""
                            src={process.env.PUBLIC_URL + "assets/img/gifty_animated.gif"}
                            className="img-fluid"
                          />
                        )
                      }
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + single.gift.id}
                      >
                        {" "}
                        {single.gift.title}{" "}
                      </Link>
                    </h4>
                    <h6>Quantité: {single.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? finalDiscountedPrice + "F CFA"
                        : finalProductPrice + "F CFA"}
                    </span>
                    {/* {single.selectedProductColor &&
                    single.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single.selectedProductColor}</span>
                        <span>Size: {single.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>

                  <div className="shopping-cart-delete">
                    <button onClick={ () => {
                      deleteFromCart(single, addToast)
                    decreaseQuantityGift(single)
                  }
                    }>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                { cartTotalPrice + "F CFA"}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              Voir le Panier
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/checkout"}
            >
              Commander
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Aucun élément dans le Panier</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  giftData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;
