import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";

const MenuCart = ({ cartData, deleteFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single.gift.price,
                // single.discount
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
                      <img
                        alt=""
                        src={single.product.image}
                        className="img-fluid"
                      />
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
                    <button onClick={() => deleteFromCart(single, addToast)}>
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
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;
