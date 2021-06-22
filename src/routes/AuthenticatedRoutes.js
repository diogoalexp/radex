import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "../screens/Home/Home";


const AuthenticatedRoutes = (props) => {
  return (
    <Switch>
      <Route path="/sair" component={Home} />
      <Route path="/perfil" component={Home} />
      <Route path="/artigos" component={Home} />
      <Route path="/" exact component={Home} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default AuthenticatedRoutes;
