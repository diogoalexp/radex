import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as request from "../../../data/request";

import Aux from "../Auxiliary/Auxiliary";

import { withSnackbar } from "notistack";

import ptBr from "../../../locales/pt-BR.json";


const withNotify = (WrappedComponent) => {
  class Base extends Component {
    state = {
      type: null,
      message: null,
      request: null,
    };

    formatError = (error) => {
      return error?.replace('/', '_').replace('.', '_').replace('-', '_').replace('-', '_').toUpperCase()
    };


    close = () => {
      this.setState({ type: null, message: null });
    };

    notify = {
      error: (message, log = null) => {
        if (log) {
          request.log("log/error", JSON.stringify(log));
        }
        this.props.enqueueSnackbar(
          message ? message : this.props.locale.erro.GLOBAL_DEFAULT_ERROR,
          {
            variant: "error",
          }
        );
      },
      warning: (message, log = null) => {
        if (log) {
          request.log("log/warning", JSON.stringify(log));
        }
        this.props.enqueueSnackbar(
          message ? message : this.props.locale.erro.GLOBAL_DEFAULT_ERROR,
          {
            variant: "warning",
          }
        );
      },
      info: (message, log = null) => {
        if (log) {
          request.log("log/info", JSON.stringify(log));
        }
        this.props.enqueueSnackbar(
          message ? message : this.props.locale.erro.GLOBAL_DEFAULT_ERROR,
          {
            variant: "info",
          }
        );
      },
      success: (message, log = null) => {
        if (log) {
          request.log("log/success", JSON.stringify(log));
        }
        this.props.enqueueSnackbar(
          message ? message : this.props.locale.erro.GLOBAL_DEFAULT_ERROR,
          {
            variant: "success",
          }
        );
      },
      exception: (log) => {
        const message = this.notify.identifyError(log);
        if (log && !message) {
          request.log("log/exception", JSON.stringify(log));
        }
        this.props.enqueueSnackbar(
          message ? message : this.props.locale.erro.GLOBAL_DEFAULT_ERROR,
          {
            variant: "default",
          }
        );
      },
      identifyError: (err) => {
        let error = err?.error?.message;
        if (!error)
          error = err?.code;
        if (!error)
          error = err?.message;
        
        if (this.props.locale.erro[error] || this.props.locale.erro[this.formatError(error)]) return this.props.locale.erro[error];

        for (const key in this.props.locale.erro) {
          if (error == key || error.includes(key) || error.includes(this.props.locale.erro[key]) || error.includes(this.formatError(key)) || error.includes(this.formatError(this.props.locale.erro[key])) )
            return this.props.locale.erro[key];
        }

        if (error.includes('A network error'))
          return this.props.locale.erro.BAD_CONNECTION;

        if (error)
          return error;
        else
          return this.props.locale.erro.DEFAULT;
      },
    };

    render() {
      return (
        <Aux>{<WrappedComponent {...this.props} notify={this.notify} />}</Aux>
      );
    }
  }

  function mapStateToProps(state) {
    // REDACTED
    return {
      locale: ptBr,
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      ...bindActionCreators(dispatch),
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Base));
};

export default withNotify;
