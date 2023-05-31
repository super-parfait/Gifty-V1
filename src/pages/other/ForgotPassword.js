
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { Link, Redirect, useHistory   } from 'react-router-dom';
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";


import { login } from "../../redux/actions/auth";
import { register } from "../../redux/actions/auth";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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


// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Cette adresse mail n'est pas valide !!!
//       </div>
//     );
//   }
// };


// const validName = (value) => {
//   if (value.length < 3 || value.length > 15) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Le nom doit etre compris entre 3 et 15.
//       </div>
//     );
//   }
// };

const validTelephone = (value) => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Le numero de téléphone doit avoir au moins 8 chiffres.
      </div>
    );
  }
};

// const validLastName = (value) => {
//   if (value.length < 6 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Le prenom doit etre entre 6 et 20 caracteres.
//       </div>
//     );
//   }
// };

// const validPassword = (value) => {
//   if (value.length < 8) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Le mot de passe doit contenir au moins 8 caracteres.
//       </div>
//     );
//   }
// };



const ForgotPassword = ({ location, props }) => {
  const { pathname } = location;

  let history = useHistory();

// Mes ajouts

    const formForgtopwd = useRef();
    const checkBtnSendOtp = useRef();

// Fin Ajout

//   const formLogin = useRef();
//   const checkBtnLogin = useRef();

  const [telephone, setTelephone] = useState("");

  const [successful, setSuccessful] = useState(false);


  const [loading, setLoading] = useState(false);



  const { isLoggedIn } = useSelector(state => state.auth);


  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeTelephone = (e) => {
    const telephone = e.target.value;
    setTelephone(telephone);
  };


  const handleForgotPwd = (e) => {
    e.preventDefault();

    const credentials = { telephone }

    setLoading(true);

    formForgtopwd.current.validateAll();

    if (checkBtnSendOtp.current.context._errors.length === 0) {
      dispatch(login(credentials))
        .then(() => {
          history("/otp-password");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };


//   const handleRegister = (e) => {
//     e.preventDefault();

//     // const credentials = {nom,prenom, telephone, email, password, confirm_password }

//     setLoading(true);

//     formRegister.current.validateAll();

//     if (checkBtnRegister.current.context._errors.length === 0) {
//       dispatch(register(credentials))
//         .then(() => {
//           // history("/my-account");
//           // window.location.reload();

//           setSuccessful(true);
//           setLoading(false)
//         })
//         .catch(() => {
//           setLoading(false);
//           setSuccessful(false);
//         });
//     }else{
//       setLoading(false);
//     }
//   };

  if (isLoggedIn) {
    return <Redirect to="/otp-password" />;
  }


  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Login</title>
        <meta
          name="description"
          content="Votre application de cadeau"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/login-register"}>Authentification</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
      Réinitialisation 
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
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
                      {/* <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Inscription </h4>
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                    <Tab.Content>

                      {/* Début formulaire de forgot password */}
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form onSubmit={handleForgotPwd} ref={formForgtopwd} >

                             <div>
                              <h5 className="ml-10" style={{color: 'gray'}}>
                                  Veuillez entrer votre Numéro de téléphone, vous recevrez par la suite un code pour Réinitialiser votre mot de passe.
                                </h5>
                             </div><br/>

                              <Input
                                type="text"
                                name="user-name"
                                placeholder="Numéro de téléphone"
                                value={telephone}
                                onChange={onChangeTelephone}
                                validations={[required]}
                              />
                              <div className="container">
                                <div className="row button-box justify-content-center">
                                    <button type="submit"  disabled={loading}>
                                      {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}  
                                      <span>Envoyer</span>
                                    </button>
                                </div>
                              </div>
                             

                              {message && (
                                <div className="form-group pt-2">
                                  <div className="alert alert-danger" role="alert">
                                    {message}
                                  </div>
                                </div>
                              )}

                              <CheckButton style={{ display: "none" }} ref={checkBtnSendOtp} />  

                            </Form>
                          </div>
                        </div>
                      </Tab.Pane>

                      {/* Fin formulaire de forgot password */}


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
};

ForgotPassword.propTypes = {
  location: PropTypes.object
};

export default ForgotPassword;

