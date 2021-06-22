import React from "react";

import pcLogo from "../../../assets/icons/home.png";
import classes from "./Logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={pcLogo} alt="promo" />
  </div>
);

export default logo;
