import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../screens/Home/Home";
import Logout from "../screens/Auth/Logout";


const AuthenticatedRoutes = (props) => {
  return (
    <Switch>
      <Route path="/sair" component={Logout} />
      <Route path="/perfil" component={Home} />
      <Route path="/artigos" component={Home} />
      <Route path="/" exact component={Home} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default AuthenticatedRoutes;
