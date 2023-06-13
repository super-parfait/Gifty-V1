import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare
}) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );

  const cartItem= cartItems.filter(cartItem => cartItem.gift.id === product.gift.id)[0]
  
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  return (
    <div className="product-details-content ml-70">
      <h2>{product.gift.title}</h2>
      <div className="product-details-price">
        {/* {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : ( */}
          <span>{finalProductPrice +  "F CFA"} </span>
        {/* )}  */}
      </div>

      {/* Les notes des cadeaux */}
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}


      <div className="pro-details-list">
        <p>{product.gift.description}</p>
      </div>

      {
        (
            
          // le product signifie que dès que l'user appuie sur le btn il est renvoyer sur la page qui affiche des produits,
          // il va donc falloir définir le véritable chemin plutard
          
          <div className="pro-details-quality">

            <div className="cart-plus-minus ml-4" style={{borderColor: 'transparent'}}>
              
            </div>


            <div className="pro-details-cart btn-hover ml-0" >
              <Link
                to={process.env.PUBLIC_URL + "/personnaliser-cadeau/"+product.gift.id}>
                Personnaliser 
              </Link>
            </div>
          </div>
        )
      }

      { 
      (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount - 1
                )
                // setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>

            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />

            <button
              onClick={() =>
                setQuantityCount(
                   quantityCount + 1
                )
                // setQuantityCount(
                //   quantityCount < productStock - productCartQty
                //     ? quantityCount + 1
                //     : quantityCount
                // )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          
          <div className="pro-details-cart btn-hover">
            <>

            {/* Le bouton pour ajouter le cadeau au panier */}
              <button
                // style={{ borderRadius: 20 }}
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                  )
                }

                className={
                  cartItem !== undefined && cartItem.quantity > 0
                    ? "active"
                    : ""
                }

                disabled={
                  cartItem !== undefined && cartItem.quantity > 0
                }
                // disabled={productCartQty >= productStock}

              >
                {" "}
                <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Ajouté"
                      : "Ajouter au panier"}
              </button>
            </>
            
          </div>
         
        </div>
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
