import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../screens/Home/Home";
import Auth from "../screens/Auth/Auth";

const AnonymousRoutes = (props) => {
  return (
    <Switch>
      <Route path="/entrar" component={Auth} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default AnonymousRoutes;
