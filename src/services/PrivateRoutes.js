import React from "react";
import { useSelector } from 'react-redux';
// import Loading from '../pages/Loading';

import {
    Route,
    Redirect,
} from "react-router-dom";

const PrivateRoute = ({ children,...rest }) => {
    const {user } = useSelector((state) => state.auth);

    

    return (
        <Route
          {...rest}
          render={({ location }) =>
          user ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login-register",
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

export default PrivateRoute;