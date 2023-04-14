import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

interface AuthRouterProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  isPrivate: boolean;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ component: Component, path, isPrivate, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(localStorage.getItem('user')) ? (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) : ( 
          <Component {...props} /> 
        )
      }
      {...rest}
    />
  );
};

export default AuthRouter;
