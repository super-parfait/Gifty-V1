import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { Redirect, useHistory   } from 'react-router-dom';
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


const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Cette adresse mail n'est pas valide !!!
      </div>
    );
  }
};


const validName = (value) => {
  if (value.length < 3 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom doit etre compris entre 3 et 15.
      </div>
    );
  }
};

const validTelephone = (value) => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Le numero de téléphone doit avoir au moins 8 chiffres.
      </div>
    );
  }
};

const validLastName = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le prenom doit etre entre 6 et 20 caracteres.
      </div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit contenir au moins 8 caracteres.
      </div>
    );
  }
};



const LoginRegister = ({ location, props }) => {
  const { pathname } = location;

  let history = useHistory();


  const formLogin = useRef();
  const checkBtnLogin = useRef();

  const formRegister = useRef();
  const checkBtnRegister = useRef();

  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("")
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [successful, setSuccessful] = useState(false);


  const [loading, setLoading] = useState(false);



  const { isLoggedIn } = useSelector(state => state.auth);
  const {isRegisterIn} = useSelector(state => state.auth);


  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

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


  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { telephone, password }

    setLoading(true);

    formLogin.current.validateAll();

    if (checkBtnLogin.current.context._errors.length === 0) {
      dispatch(login(credentials))
        .then(() => {
          history("/my-account");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };


  const handleRegister = (e) => {
    e.preventDefault();

    const credentials = {nom,prenom, telephone, email, password, confirm_password }

    setLoading(true);

    formRegister.current.validateAll();

    if (checkBtnRegister.current.context._errors.length === 0) {
      dispatch(register(credentials))
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

  if (isLoggedIn) {
    return <Redirect to="/my-account" />;
  }


  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
      Authentification 
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
                          <h4>Connexion</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Inscription </h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>

                      {/* Le formulaire de Connexion */}
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form onSubmit={handleLogin} ref={formLogin} >
                              <Input
                                type="text"
                                name="user-name"
                                placeholder="Numéro de téléphone"
                                value={telephone}
                                onChange={onChangeTelephone}
                                validations={[required]}
                              />
                              <Input
                                type="password"
                                name="user-password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Se Souvenir de Moi</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Mot de Passe oublié ?
                                  </Link>
                                </div>
                                  
                              </div>


                              <div className="container">
                                <div className="row button-box justify-content-center">
                                    <button type="submit"  disabled={loading}>
                                      {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                      )}  
                                      <span>Se Connecter</span>
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

                              <CheckButton style={{ display: "none" }} ref={checkBtnLogin} />  

                            </Form>
                          </div>
                        </div>
                      </Tab.Pane>


                      {/* Le Formulaire d'Inscription */}
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <Form onSubmit={handleRegister} ref={formRegister}>
                              <Input
                                type="text"
                                name="user-name"
                                placeholder="Nom"
                                value={nom}
                                onChange={onChangeNom}
                                validations={[required]}
                              />
                              <Input
                                type="text"
                                name="user-lastname"
                                placeholder="Prénoms"
                                value={prenom}
                                onChange={onChangePrenom}
                                validations={[required]}
                              />
                              <Input
                                type="text"
                                name="phone-number"
                                placeholder="Numéro de téléphone"
                                value={telephone}
                                onChange={onChangeTelephone}
                                validations={[required]}
                              />
                              <Input
                                
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required]}
                              />
                              <Input
                                type="password"
                                name="user-password"
                                placeholder="Mot de Passe"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                              />
                              <Input
                                type="password"
                                name="user-cpassword"
                                placeholder="Confirmation Mot de Passe"
                                value={confirm_password}
                                onChange={onChangeConfirmPassword}
                                validations={[required]}
                              />
                              <div className="container">
                                  <div className="row button-box justify-content-center">
                                    <button type="submit" disabled={loading}>
                                        {loading && (
                                          <span className="spinner-border spinner-border-sm"></span>
                                        )} 
                                      <span>S'Inscrire</span>
                                    </button>
                                  </div>
                              </div>


                              {message && (
                                <div className="form-group pt-2">
                                  <div className={successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                    {message}
                                  </div>
                                </div>
                              )}

                              <CheckButton style={{ display: "none" }} ref={checkBtnRegister} /> 


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
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
