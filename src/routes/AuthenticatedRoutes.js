import React from "react";
import { Route, Switch } from "react-router-dom";

import Maintenance from "../screens/Maintenance/Maintenance";
import Home from "../screens/Home/Home";
import Logout from "../screens/Auth/Logout";
import Perfil from "../screens/Perfil/Perfil";
import Artigos from "../screens/Artigos/Artigos";
import Quiz from "../screens/Quiz/Quiz";
import Resultado from "../screens/Resultado/Resultado";


const AuthenticatedRoutes = (props) => {
  return (
    <Switch>
      <Route path="/sair" component={Logout} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/artigos" component={Artigos} />
      <Route path="/avaliacao" component={Quiz} />
      <Route path="/resultado" component={Resultado} />
      <Route path="/" exact component={Home} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );
};

export default AuthenticatedRoutes;
