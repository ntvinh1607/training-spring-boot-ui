import React from "react";
import { Route, Redirect } from "react-router-dom";
import {RoutesString} from "../../pages/routesString";
import authenticationService from "../../services/Authentication_service";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            const currentUser = authenticationService.currentUserValue;
            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return (
                    <Redirect
                        to={{ pathname: RoutesString.ACCESS_DENIED, state: { from: props.location } }}
                    />
                );
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

export default PrivateRoute;