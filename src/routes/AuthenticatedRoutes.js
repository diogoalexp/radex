import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../screens/Home/Home";
import Logout from "../screens/Auth/Logout";
import Maintenance from "../screens/Maintenance/Maintenance";
import Perfil from "../screens/Perfil/Perfil";
import Artigos from "../screens/Artigos/Artigos";


const AuthenticatedRoutes = (props) => {
  return (
    <Switch>
      <Route path="/sair" component={Logout} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/artigos" component={Artigos} />
      <Route path="/avaliacao" component={Maintenance} />
      <Route path="/" exact component={Home} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default AuthenticatedRoutes;
