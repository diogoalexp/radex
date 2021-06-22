import React, { Component } from "react";

import ptBr from "../../../locales/pt-BR.json";

function withLocale(WrappedComponent) {
  class Base extends Component {
    constructor() {
      super();
    }

    render() {
      return <WrappedComponent locale={ptBr} {...this.props} />;
    }
  }

  return (Base);
}
export default withLocale;
