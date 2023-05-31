import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import React, { Fragment, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !!!
      </div>
    );
  }
};

const validTelephone = (value) => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Le numéro de téléphone doit avoir au moins 8 chiffres.
      </div>
    );
  }
};

const OtpPwd = ({ location, props }) => {
  const { pathname } = location;

  let history = useHistory();

  const FormOtp = useRef();
  const checkBtnOtp = useRef();

  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
//   const { isValidOtp } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

//   if (isValidOtp) {
//     return <Redirect to="/login-register" />;
//   }

  function OtpPassword() {
    const [otp, setOtp] = useState(["", "", "", ""]); // Tableau pour stocker les chiffres de l'OTP
    const inputRefs = useRef([]); // Référence des champs d'entrée

    const handleChange = (index, event) => {
      const value = event.target.value;
    
      // Vérifier si le caractère saisi est un chiffre
      if (/^\d*$/.test(value)) {
        // Mettre à jour la valeur de l'OTP à l'index spécifié
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // Déplacer le focus vers le champ d'entrée suivant si un chiffre est entré
        if (value && index < otp.length - 1) {
          const nextInput = inputRefs.current[index + 1];
          if (nextInput) {
            nextInput.focus(); // Déplacer le focus vers le champ d'entrée suivant
            nextInput.select(); // Sélectionner tout le contenu du champ d'entrée suivant
          }
        }
      }
    };

    const setRef = (ref, index) => {
      inputRefs.current[index] = ref;
    };

    const handleKeyDown = (index, event) => {
      // Supprimer le chiffre précédent si la touche de retour arrière est pressée et le champ est vide
      if (
        event.key === "Backspace" &&
        !otp[index] &&
        inputRefs.current[index - 1]
      ) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    };

    const handleOtpSubmit = (event) => {
      event.preventDefault();
    
      // Effectuez les actions nécessaires pour traiter les données soumises
      // Par exemple, vous pouvez vérifier si le code OTP est valide
    
      // Exemple de redirection vers une autre page après la soumission réussie
      history.push('/login-register');
    };

    return (
      <Fragment>
        <MetaTags>
          <title>Gifty | Login</title>
          <meta name="description" content="Votre application de cadeau" />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/login-register"}>
          Authentification
        </BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Réinitialisation
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          <Breadcrumb />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>Réinitialiser votre Mot de passe</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        {/* Début formulaire de forgot password */}
                        <Tab.Pane eventKey="login">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <Form onSubmit={handleOtpSubmit} ref={FormOtp}>
                                <div 
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}
                                >
                                  {otp.map((digit, index) => (
                                    <Input
                                      key={index}
                                      type="text"
                                      maxLength="1"
                                      name={`digit-${index}`}
                                      value={digit}
                                      onChange={(event) =>
                                        handleChange(index, event)
                                      }
                                      onKeyDown={(event) =>
                                        handleKeyDown(index, event)
                                      }
                                      ref={(ref) => setRef(ref, index)}
                                      style={{
                                        width: '55px',
                                        height: '55px',
                                        textAlign: 'center',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                      }}
                                    />
                                  ))}
                                </div>
                                <br />

                                <div className="container">
                                  <div className="row button-box justify-content-center">
                                    <button
                                      type="submit"
                                      disabled={loading}
                                      onClick={handleOtpSubmit}
                                    >
                                      {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}
                                      <span>Envoyer</span>
                                    </button>
                                  </div>
                                </div>

                                {message && (
                                  <div className="form-group pt-2">
                                    <div
                                      className="alert alert-danger"
                                      role="alert"
                                    >
                                      {message}
                                    </div>
                                  </div>
                                )}

                                <CheckButton
                                  style={{ display: "none" }}
                                  ref={checkBtnOtp}
                                />
                              </Form>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
    );
  }

  return (
    <div>
      <OtpPassword />
    </div>
  );
};

OtpPwd.propTypes = {
  location: PropTypes.object,
};

export default OtpPwd;
