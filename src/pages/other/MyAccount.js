import PropTypes from "prop-types";
import React, { Fragment, useState, useRef } from "react";
import {  useHistory, Redirect   } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import table from "./table"

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
import { update_info, update_password } from "../../redux/actions/auth";



const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champs est requis !!!
      </div>
    );
  }
};



const MyAccount = ({ location }) => {
  const { pathname } = location;





  const formUpdateInfo = useRef();
  const checkBtnUpdateInfo = useRef();

  const formUpdatePassword = useRef();
  const checkBtnUpdatePassword = useRef();

  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [successful, setSuccessful] = useState(false);


  const [loading, setLoading] = useState(false);


  // const { message } = useSelector(state => state.message);

  const { message_update_info } =useSelector(state=>state.message)

  const { message_update_password } =useSelector(state=>state.message)

  const { user: currentUser } = useSelector((state) => state.auth);


  const dispatch = useDispatch();


  if (!currentUser) {
    return <Redirect to="/login-register" />;
  }

  const onChangeTelephone = (e) => {
    const telephone = e.target.value;
    setTelephone(telephone);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
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

  const onChangeConfirmPassword = (e) => {
    const confirm_password = e.target.value;
    setConfirmPassword(confirm_password);
  };

  
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const credentials = {password,confirm_password}


    // var credentials = {};

    // for (var clé in data) {
    //   var valeur = data[clé];
    //   if (valeur !== null && valeur !== undefined && valeur !== '') {
    //     credentials[clé] = valeur;
    //   }
    // }


    console.log(credentials)
    console.log(typeof(credentials))

    setLoading(true);

    formUpdatePassword.current.validateAll();

    if (checkBtnUpdatePassword.current.context._errors.length === 0) {


      dispatch(update_password(credentials))
        .then(() => {
          // history("/my-account");
          // window.location.reload();

          setSuccessful(true);
          setLoading(false)
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false);
        });
    }else{
      setLoading(false);
    }
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();

    var data = {nom,prenom, telephone, email }


    var credentials = {};

    for (var clé in data) {
      var valeur = data[clé];
      if (valeur !== null && valeur !== undefined && valeur !== '') {
        credentials[clé] = valeur;
      }
    }


    console.log(credentials)
    console.log(typeof(credentials))

    setLoading(true);

    formUpdateInfo.current.validateAll();

    if (checkBtnUpdateInfo.current.context._errors.length === 0) {


      dispatch(update_info(credentials))
        .then(() => {
          // history("/my-account");
          // window.location.reload();

          setSuccessful(true);
          setLoading(false)
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false);
        });
    }else{
      setLoading(false);
    }
  };



  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Mon Compte</title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mon Compte
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">

                    {/* La partie affichant les infos des users */}
                    {/* <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Mes Informations{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Mes informations personnelles</h4>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label style={{color:`red`, fontSize:`20px`}} >Nom</label>
                                  <p> {currentUser.nom}  </p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label style={{color:`red`, fontSize:`20px`}} >Prénom</label>
                                  <p> {currentUser.prenom} </p>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label style={{color:`red`, fontSize:`20px`}} >Numéro de téléphone</label>
                                  <p>{currentUser.telephone}</p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label style={{color:`red`, fontSize:`20px`}} >Email </label>
                                  <p> {currentUser.email} </p>
                                </div>
                              </div>
                             
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card> */}

                    {/* La partie du formulaire pour modifier  les infos des clients */}
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Modifier Mes Informations{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Form onSubmit={handleUpdateInfo} ref={formUpdateInfo} >
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Modifier mes informations personnelles</h4>
                                {/* <h5>Your Personal Details</h5> */}
                              </div>
                              <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6">
                                  <div className="billing-info">
                                    <label>Nom</label>
                                    <Input type="text" placeholder={currentUser.nom} value={nom} onChange={onChangeNom}  />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="billing-info">
                                    <label>Prénoms</label>
                                    <Input type="text" placeholder={currentUser.prenom} value={prenom} onChange={onChangePrenom}  />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                  <div className="billing-info">
                                    <label>Numéro de téléphone</label>
                                    <Input type="text" placeholder={currentUser.telephone} value={telephone} onChange={onChangeTelephone}  />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Email </label>
                                    <Input type="email" placeholder={currentUser.email} value={email} onChange={onChangeEmail}  />
                                  </div>
                                </div>
                                
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit" disabled={loading}>
                                    {loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}  
                                    
                                    Enregister
                                  </button>
                                </div>
                              </div>
                            </div>
                              {message_update_info && (
                                <div className="form-group pt-2">
                                  <div className= {successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message_update_info}
                                  </div>
                                </div>
                              )}

                              <CheckButton style={{ display: "none" }} ref={checkBtnUpdateInfo} />  
                            
                          </Form> 
                          
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* La partie du formulaire pour modifier le mot de passe */}
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span>Sécurité
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <Form onSubmit={handleUpdatePassword} ref={formUpdatePassword}>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Modifier mon Mot de Passe</h4>
                                {/* <h5>Your Password</h5> */}
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Nouveau mot de passe</label>
                                    <Input type="password" placeholder="********" value={password} onChange={onChangePassword} />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Confirmer Mot de Passe</label>
                                    <Input type="password" placeholder="Confirmez le mot de passe" value={confirm_password} onChange={onChangeConfirmPassword} />
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit" disabled={loading}>
                                    {loading && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}  
                                    
                                    Enregister
                                  </button>
                                </div>
                              </div>
                            </div>
                              {message_update_password && (
                                <div className="form-group pt-2">
                                  <div className= {successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message_update_password}
                                  </div>
                                </div>
                              )}

                              <CheckButton style={{ display: "none" }} ref={checkBtnUpdatePassword} />

                          </Form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    {/* La partie pour afficher le suivi des commandes */}
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span>Historique des commandes
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <table />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;
