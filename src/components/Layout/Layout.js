import React, { useState } from "react";
import { useSelector } from "react-redux";

import Aux from "../HighOrder/Auxiliary/Auxiliary";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Footer from "./Footer/Footer";

import classes from "./Layout.module.css";

const Layout = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prev) => !prev);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
      <Footer />
    </Aux>
  );
};

export default Layout;
