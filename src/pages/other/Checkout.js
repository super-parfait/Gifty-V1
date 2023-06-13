import PropTypes from "prop-types";
import React, { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios";
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





const Checkout = ({ location, cartItems, currency, commande }) => {
  const { pathname } = location;

  let cartTotalPrice = 0;



  const formCheckout = useRef();
  const checkBtnCheckout = useRef();
  const paiementRef = useRef(null);

  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("")
  const [quartier, setQuartier] =  useState("")
  const [full_name, setFullName] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const [Apikey, setApikey] = useState('');
  const [Service, setService] = useState('');
  const [Custom_data, setCustom_data] = useState('');
  const [Amount, setAmount] = useState('');




  var credentials = ""

  const onChangeTelephone = (e) => {
    const telephone = e.target.value;
    setTelephone(telephone);
  };

  const onChangeVille = (e) => {
    const ville = e.target.value;
    setVille(ville);
  };

  const onChangeAdresse = (e)=>{
    const adresse = e.target.value;
    setAdresse(adresse)
  };



  const onChangeFullName = (e) => {
    const full_name = e.target.value;
    setFullName(full_name);
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


if(commande.payload){
  var orderID = commande.payload.orderID
var UserId = commande.payload.UserId

// console.log(orderID)
// console.log(UserId)

}

const functionCredentialsForPayment = async (orderID, UserId)=>{

          const response1 = await axios
          .post("https://dev-mks.com:9000/api/v1/srv-core/order/"+orderID+"/payment/",{}, {headers:{"UserId":UserId}}) 

          var credentials = response1.data;

          // Je mets a jour les infos de credentials
          setAmount(credentials.amount)
          setApikey(credentials.apikey)
          setCustom_data(credentials.custom_data)
          setService(credentials.service)

          setTimeout(() => {
            paiementRef.current.click();
          }, 3000);



}


// const validateForm()

  const handleCheckout = (e) => {
    e.preventDefault();

    

    const credentials = {
      "customer_full_name": full_name,
      // "customer_last_name": prenom,
      "customer_phone_number": telephone,
      "delivery_address": adresse,
      // "customer_neighborhood": quartier,
      // "customer_email": email,
      // "customer_commune": commune,
      "theme": theme,
      "gifts": final_gift
    }

    console.log(credentials)

    setLoading(true);

    formCheckout.current.validateAll();

    if (checkBtnCheckout.current.context._errors.length === 0) {
      dispatch(checkout(credentials))
        .then(() => {
          
          setLoading(false)
          setSuccessful(true);

          // J'effectue la requete de paiement de maniere asyncrone
          functionCredentialsForPayment(orderID, UserId)
          
        })
        .catch(() => {
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
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
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
                            <label>Nom et Prénom(s)</label>
                            <Input type="text" placeholder="Votre Nom et Prénoms"
                                value={full_name}
                                onChange={onChangeFullName}
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
                          <div className="billing-info mb-20">
                            <label>Votre Adresse de Livraison</label>
                            <Input
                              placeholder="Votre Adresse de Livraison"
                              name="adresse"
                              value={adresse}
                              onChange={onChangeAdresse}
                              validations={[required]}
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
                      
                        Valider ma commande
                        
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
                <div className="row justify-content-center my-auto">
                  <form action="https://kaliapay.com/request-payment-channels" method="post">
                      
                          {/* ApiKEy */}
                      <input name="apikey" type="text" style={{ display:"none"}} value={ Apikey } onChange={(e)=>setApikey(e.target.value)} />
                        {/* amount */}
                      <input name="amount" type="text" style={{ display:"none"}} value={ Amount } onChange={(e)=>setAmount(e.target.value)} />

                      {/* le service */}
                      <input name="service" type="text" style={{ display:"none"}} value={ Service } onChange={(e)=>setService(e.target.value)} />

                      {/* le custom_data */}
                      <input name="custom_data" type="text" style={{ display:"none"}} value={ Custom_data } onChange={(e)=>setCustom_data(e.target.value)} />
                      <button type="submit" ref={paiementRef} class="btn btn-success" style={{marginLeft: 15, display: "none"}} >Valider mon paiement
                      </button>
                  </form>
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
  location: PropTypes.object,
  commande: PropTypes.object,
  functionCredentialsForPayment:PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
    commande: state.commande
  };
};

export default connect(mapStateToProps)(Checkout);
