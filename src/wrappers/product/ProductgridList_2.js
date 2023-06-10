import PropTypes from "prop-types";
import React, { Fragment, Link } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToGift } from "../../redux/actions/giftActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle2 from "../../components/product/ProductGridListSingle_2";

const ProductGrid = ({
  products,
  currency,
  addToCart,
  addToGift,
  addToWishlist,
  addToCompare,
  cartItems,
  Gift,
  quantityGift,
  giftItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass
}) => {

  // console.log(Gift)
  // console.log(products)
  // console.log(giftItems)

  return (
    <Fragment>
      {
      products.map(product => {
        return (
         
          <ProductGridListSingle2
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            Gift = {Gift}
            quantityGift={quantityGift}
            currency={currency}
            addToCart={addToCart}
            addToGift={ addToGift }
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            // giftItem={
            //   giftItems.filter(giftItem => giftItem.id === product.id)[0]
            // }
            wishlistItem={
              wishlistItems.filter(
                wishlistItem => wishlistItem.id === product.id
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.id === product.id
              )[0]
            }
            key={product.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToGift: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  Gift: PropTypes.array,
  quantityGift: PropTypes.string,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    giftItems: state.giftData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
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
    // Ajouter un produit au cadeau
    addToGift: (
      item,
      addToast,
      quantityCount,
      // Gift,
      // quantityGift,
      // selectedProductColor,
      // selectedProductSize
    ) => {
      dispatch(
        addToGift(
          item,
          addToast,
          quantityCount,
          // Gift,
          // quantityGift,
          // selectedProductColor,
          // selectedProductSize
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
