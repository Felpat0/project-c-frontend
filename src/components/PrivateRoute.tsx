import * as React from "react";
import { Redirect, Route } from "react-router-dom";

type Props = {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  path: string;
  exact?: boolean;
};

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  isAuthenticated,
  exact,
  ...otherProps
}) => {
  return (
    <Route
      exact={exact}
      {...otherProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...otherProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
