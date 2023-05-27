import React, { useContext } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Auth from "../../contexts/Auth";

const AuthenticatedRoute = ({children})=>{
        const {isAuthenticated} = useContext(Auth)

        return isAuthenticated ? (
                        children
            ) : (
                <Redirect to="/login" />
            )
}

export default AuthenticatedRoute

