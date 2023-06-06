import PropTypes from "prop-types";
import React, { Fragment, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect, useDispatch, useSelector } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useToasts } from 'react-toast-notifications';


import { checkout } from "../../redux/actions/checkoutAction";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champs est requis !!!
      </div>
    );
  }
};





const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;



  const formCheckout = useRef();
  const checkBtnCheckout = useRef();

  const [telephone, setTelephone] = useState("");
  const [commune, setCommune] = useState("");
  const [ville, setVille] = useState("")
  const [quartier, setQuartier] =  useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);


  const onChangeTelephone = (e) => {
    const telephone = e.target.value;
    setTelephone(telephone);
  };

  const onChangeVille = (e) => {
    const ville = e.target.value;
    setVille(ville);
  };

  const onChangeCommune = (e)=>{
    const commune = e.target.value;
    setCommune(commune)
  };



  const onChangeNom = (e) => {
    const nom = e.target.value;
    setNom(nom);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePrenom = (e) => {
    const prenom = e.target.value;
    setPrenom(prenom);
  };

  const onChangeQuartier = (e) => {
    const quartier = e.target.value;
    setQuartier(quartier);
  };

  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const { message_checkout } = useSelector(state => state.message);

  const gift = useSelector(state => state.cartData);

  const {query:theme} = useSelector(state => state.productData);



  // Je crée un tableau qui va contenir exactement les infos pour la requetes de creation de commande

  var objet;
  var final_gift= [];
  for (let i = 0; i < gift.length; i++) {
    objet = gift[i];

    const a = {
      "id": objet.gift.id,
      "gift": objet.gift,
      "product": objet.product,
      "quantity": objet.quantity
    }

    final_gift.push(a)
  }
  

  // console.log(final_gift)
  // console.log(gift[0].gift
    // )

  // if (gift.length>=1) {
  //   var final_gift = [{
  //     "id": objet.cartItemId,
  //     "gift": objet.gift,
  //     "product": objet.product,
  //     "quantity": objet.quantity
  //   }]
  // }

  // console.log(final_gift)




  const handleCheckout = (e) => {
    e.preventDefault();

    // const credentials = {nom,prenom, telephone, email, commune, quartier, ville }

    const credentials = {
      "customer_first_name": nom,
      "customer_last_name": prenom,
      "customer_phone_number": telephone,
      "customer_city": ville,
      "customer_neighborhood": quartier,
      "customer_email": email,
      "customer_commune": commune,
      "theme": theme,
      "gifts": final_gift
    }

    // console.log(credentials)

    setLoading(true);

    formCheckout.current.validateAll();

    if (checkBtnCheckout.current.context._errors.length === 0) {
      dispatch(checkout(credentials))
        .then(() => {
          
          setLoading(false)
          addToast(message_checkout, { appearance: 'success', autoDismiss:true });
          setSuccessful(true);
          
        })
        .catch(() => {
          setLoading(false);
          addToast(message_checkout, { appearance: 'error', autoDismiss:true });
          
          setSuccessful(false);
        });
    }else{
      setLoading(false);
    }
  };


  

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
              <Form onSubmit={handleCheckout} ref={formCheckout}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Détails de la Commande</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Nom</label>
                            <Input type="text" placeholder="Votre Nom"
                                value={nom}
                                onChange={onChangeNom}
                                validations={[required]} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Prénoms</label>
                            <Input type="text" placeholder="Votre Prénom"
                                value={prenom}
                                onChange={onChangePrenom}
                                validations={[required]} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email</label>
                            <Input type="email" placeholder="Votre mail"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required]} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                            <label>Numéro de téléphone</label>
                            <Input type="text" placeholder="Votre Telephone"
                                value={telephone}
                                onChange={onChangeTelephone}
                                validations={[required]} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>Ville</label> 
                            <Select name="ville" placeholder="Ville"
                                value={ville}
                                onChange={onChangeVille}
                                validations={[required]}>
                              <option value={""}>Sélectionnez une Ville</option>
                              <option value={"Abidjan"}>Abidjan</option>
                              <option value={"Yamoussoukro"}>Yamoussoukro</option>
                              <option value={"San Pedro"} >San Pedro</option>
                              <option value={"Bouake"}>Bouaké</option>
                              <option value={"Korhogo"}>Korhogo</option>
                            </Select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                            <label>Votre commune</label>
                            <Input
                              placeholder="Entrez votre Commune"
                              name="commune"
                              value={commune}
                              onChange={onChangeCommune}
                              validations={[required]}
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="billing-info mb-20">
                          <label>Votre Quartier</label>
                            <Input
                              className="billing-address"
                              placeholder="Entrez votre Quartier"
                              type="text"
                              name="quartier"
                              value={quartier}
                              onChange={onChangeQuartier}
                              validations={[required]}
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
                        <button  type="submit" className="btn-hover" disabled={loading}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        
                          Valider
                          
                        </button>
                      </div>
                    </div>
                  </div>
                </div>



                {
                  message_checkout && (
                    <div className="form-group pt-2">
                      <div className={successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                        {message_checkout}
                      </div>
                    </div>
                  )
                }

                  {/* {
                    message_checkout && (
                      <div className="form-group pt-2">
                        <div className="alert alert-danger" role="alert">
                          {message_checkout}
                        </div>
                      </div>
                    )
                  }  */}


                <CheckButton style={{ display: "none" }} ref={checkBtnCheckout} />
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
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Ajouter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/history-order"}
                        >
                          Confirmer mes commandes 
                        </Link>
                      </div>
                      {/* <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Effacer Panier
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
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
