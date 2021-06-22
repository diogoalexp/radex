import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "../screens/Home/Home";

const AnonymousRoutes = (props) => {
  return (
    <Switch>
      <Route path="/entrar" component={Home} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};

export default AnonymousRoutes;
