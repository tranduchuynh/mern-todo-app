import React, { useContext } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarMenu from "../layout/NavbarMenu";

ProtectedRoute.propTypes = {};

function ProtectedRoute({ component: Component, ...rest }) {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spiner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
