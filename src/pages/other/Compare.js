import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { deleteFromCompare } from "../../redux/actions/compareActions";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import { useSelector } from "react-redux";


const Compare = ({
  location,
  cartItems,
  compareItems,
  addToCart,
  deleteFromCompare,
  currency
}) => {
  const { pathname } = location;
  const { addToast } = useToasts();


  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login-register" />;
  }


  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Comparer</title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Comparer
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="compare-main-area pt-90 pb-100">
          <div className="container">
            {compareItems && compareItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">Infos Produits</th>
                            {compareItems.map((compareItem, key) => {
                              const cartItem = cartItems.filter(
                                item => item.id === compareItem.id
                              )[0];
                              return (
                                <td className="product-image-title" key={key}>
                                  <div className="compare-remove">
                                    <button
                                      onClick={() =>
                                        deleteFromCompare(compareItem, addToast)
                                      }
                                    >
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      compareItem.id
                                    }
                                    className="image"
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        compareItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                  <div className="product-title">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        compareItem.id
                                      }
                                    >
                                      {compareItem.name}
                                    </Link>
                                  </div>
                                  <div className="compare-btn">
                                    {compareItem.affiliateLink ? (
                                      <a
                                        href={compareItem.affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        Ajouter{" "}
                                      </a>
                                    ) : compareItem.variation &&
                                      compareItem.variation.length >= 1 ? (
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/product/${compareItem.id}`}
                                      >
                                       Ajouter
                                      </Link>
                                    ) : compareItem.stock &&
                                      compareItem.stock > 0 ? (
                                      <button
                                        onClick={() =>
                                          addToCart(compareItem, addToast)
                                        }
                                        className={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                            ? "active"
                                            : ""
                                        }
                                        disabled={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                        }
                                        title={
                                          compareItem !== undefined
                                            ? "Ajouté au Panier"
                                            : "Ajouter au Panier"
                                        }
                                      >
                                        {cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "Ajouté"
                                          : "Ajouter au Panier"}
                                      </button>
                                    ) : (
                                      <button disabled className="active">
                                        Ajouter
                                      </button>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Prix</th>
                            {compareItems.map((compareItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                compareItem.price,
                                compareItem.discount
                              );
                              const finalProductPrice = (
                                compareItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);
                              return (
                                <td className="product-price" key={key}>
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Description</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>
                                    {compareItem.shortDescription
                                      ? compareItem.shortDescription
                                      : "N/A"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Evaluation</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-rating" key={key}>
                                  <Rating ratingValue={compareItem.rating} />
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                     Aucun produit à comparer <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}>
                       Ajouter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteFromCompare: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
