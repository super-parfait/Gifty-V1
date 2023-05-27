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

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// import { isEmail } from "validator";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champs est requis !!!
      </div>
    );
  }
};



const LoginRegister = ({ location, props }) => {
  const { pathname } = location;

  let history = useHistory();


  const form = useRef();
  const checkBtn = useRef();

  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
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


  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = { telephone, password }

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
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
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
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
                            <Form onSubmit={handleLogin} ref={form} >
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
                                <button type="submit"  disabled={loading}>
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}  
                                  <span>Se Connecter</span>
                                </button>
                              </div>

                              {message && (
                                <div className="form-group">
                                  <div className="alert alert-danger" role="alert">
                                    {message}
                                  </div>
                                </div>
                              )}

                              <CheckButton style={{ display: "none" }} ref={checkBtn} />  

                            </Form>
                          </div>
                        </div>
                      </Tab.Pane>


                      {/* Le Formulaire d'Inscription */}
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Nom & Prénoms"
                              />
                              <input
                                type="text"
                                name="phone-number"
                                placeholder="Numéro de téléphone"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Mot de Passe"
                              />
                              <input
                                type="password"
                                name="user-cpassword"
                                placeholder="Confirmation Mot de Passe"
                              />
                              
                              <div className="button-box">
                                <button type="submit">
                                  <span>S'Inscrire</span>
                                </button>
                              </div>
                            </form>
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
