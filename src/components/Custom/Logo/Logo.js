import React from "react";

import pcLogo from "../../../assets/icons/logo.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={{ height: 48, width: 48 }}>
    <img src={pcLogo} alt="promo" />
  </div>
);

export default logo;
