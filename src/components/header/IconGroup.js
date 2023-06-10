import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { useSelector } from "react-redux";





const IconGroup = ({
  currency,
  cartData,
  giftData,
  wishlistData,
  compareData,
  deleteFromCart,
  iconWhiteClass
}) => {

  const { isLoggedIn } = useSelector(state => state.auth);

  console.log(isLoggedIn)

  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  var quantityCart;
  // Recuperation de la quantité de cadeau dans le panier
    if(cartData && giftData ){
      quantityCart = cartData.length + giftData.length
    }else if(giftData){
      quantityCart = giftData.length
    }else{
      quantityCart = cartData.length
    }

    console.log(quantityCart)

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search myicon" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search myicon" />
            </button>
          </form>
        </div>
      </div>

      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user myicon" />
        </button>
        
            {isLoggedIn ? (
              <div className="account-dropdown">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/my-account"}>
                      Mon Compte
                    </Link>
                  </li>
                </ul>
              </div>
            ):(
              <div className="account-dropdown">
                <ul>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>Connexion</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/login-register"}>
                      Inscription
                    </Link>
                  </li>
                </ul>
              </div>
            )}


      </div>

      
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-search" />
        </button>
      </div>
      
      <div className="same-style cart-wrap d-block d-lg-none">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user" />
        </button>
        {isLoggedIn ? (
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  Mon Compte
                </Link>
              </li>
            </ul>
          </div>
        ):(
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>Connexion</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Inscription
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart " onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag myicon" />
          <span className="count-style">
            {
              quantityCart ? quantityCart : 0
              
            }
          </span>
        </button>
        
        {/* menu cart */}
        
        <MenuCart
          cartData={cartData}
          giftData={giftData}
          currency={currency}
          deleteFromCart={deleteFromCart}
        />
      </div>
      
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart " to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
        
      </div>
      
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  giftData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    giftData: state.giftData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
