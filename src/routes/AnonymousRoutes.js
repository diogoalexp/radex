import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../screens/Home/Home";
import Auth from "../screens/Auth/Auth";
import Artigos from "../screens/Artigos/Artigos";

const AnonymousRoutes = (props) => {
  return (
    <Switch>
      <Route path="/entrar" component={Auth} />
      <Route path="/artigos" component={Artigos} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default AnonymousRoutes;
