import React from "react";

import classes from "./Footer.module.css";

const Footer = (props) => (
  <footer>
    <div className={classes.dono}>
      <b>Celine Petterle Alberti - 2021. Todos os direitos Reservados</b>
    </div>
    <div className={classes.dev}>
      Desenvolvido por diogoalexp
    </div>
  </footer>
);

export default Footer;
