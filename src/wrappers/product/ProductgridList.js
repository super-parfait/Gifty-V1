import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {Redirect} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = ({
  // data,
  // currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass
}) => {


  console.log(cartItems)


  const { data } = useSelector(state => state.productData);

  const {query} = useSelector(state=>state.productData)


  console.log(query)

  // Si aucun theme n'est saisi on le redirige sur la pade d'accueil
  if(query===""){
    return <Redirect to="/" />;
  }



  return (
    <Fragment>
      {data.map(product => {
        
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            // currency={currency}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            addToCompare={addToCompare}
            cartItem={
              cartItems.filter(cartItem => cartItem.gift.id === product.gift.id)[0]
            }
            wishlistItem={
              wishlistItems.filter(
                wishlistItem => wishlistItem.gift.id === product.gift.id
              )[0]
            }
            compareItem={
              compareItems.filter(
                compareItem => compareItem.gift.id === product.gift.id
              )[0]
            }
            key={product.gift.id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
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
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
