import React from "react";
import { Link } from "react-router-dom";

import classes from "./Toolbar.module.css";
import { Logo } from "../../Custom";
import NavigationItems from "../Navigation/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
