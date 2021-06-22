import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {props.isAuthenticated
      ? [
        <NavigationItem link="/" exact key="1">
          Home
      </NavigationItem>,
        <NavigationItem link="/perfil" key="2">
          Perfil
      </NavigationItem>,
        <NavigationItem link="/artigos" key="3">
          Artigos
      </NavigationItem>,
        <NavigationItem link="/sair" key="4">
          Sair
      </NavigationItem>,
      ]
      : [
        <NavigationItem link="/entrar" key="5">
          Entrar
        </NavigationItem>,
      ]}
  </ul>
);

export default navigationItems;
