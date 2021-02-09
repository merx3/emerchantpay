import React from "react";
import { useAuth } from "../../helpers/hooks/use-auth";
import {
    Route,
    Redirect,
} from "react-router-dom";

function RedirectProtected({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/admin/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
export default RedirectProtected;