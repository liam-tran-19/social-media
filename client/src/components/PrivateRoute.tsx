import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ProtectedRouteProps } from "../types/interfaces";

export default function PrivateRoute({
  component: Component,
  auth,
  ...rest
}: ProtectedRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth && auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
}
