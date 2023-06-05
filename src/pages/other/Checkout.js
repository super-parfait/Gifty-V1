import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";


import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;

  const [telephone, setTelephone] = useState("");
  const [commune, setCommune] = useState("");
  const [ville, setVille] = useState("")
  const [quartier, setQuartier] =  useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")

  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Paiement</title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Commande
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Form>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Détails de la Commande</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Nom</label>
                            <Input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Prénoms</label>
                            <Input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email</label>
                            <Input type="email" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                            <label>Numéro de téléphone</label>
                            <input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>Ville</label> 
                            <select>
                              <option>Sélectionnez une Ville</option>
                              <option>Abidjan</option>
                              <option>Yamoussoukro</option>
                              <option>San Pedro</option>
                              <option>Bouaké</option>
                              <option>Korhogo</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                            <label>Votre commune</label>
                            <input
                              placeholder="Entrez votre Commune"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                          <label>Votre Quartier</label>
                            <input
                              className="billing-address"
                              placeholder="Entrez votre Quartier"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Mes Achats</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Cadeau(x) </li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {

                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );

                                const finalProductPrice = (
                                  cartItem.gift.price
                                ).toFixed(2);


                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);


                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">

                                      {
                                        
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2) + " F CFA"
                                      }
                                      {/* {discountedPrice !== null
                                        ? currency.currencySymbol +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice * cartItem.quantity
                                          ).toFixed(2)} */}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              {/* <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li> */}
                              <li className="your-order-shipping"></li>
                              <li> </li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {
                                  cartTotalPrice.toFixed(2) + " F CFA"
                                } 
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button className="btn-hover">Valider</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun cadeau pour éffectuer une commande <br />{" "}
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(Checkout);
