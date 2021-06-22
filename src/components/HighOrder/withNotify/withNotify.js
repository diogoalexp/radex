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
        const ID = err?.error?.message;

        if (this.props.locale.erro[ID]) return this.props.locale.erro[ID];

        for (const key in this.props.locale.erro) {
          if (err?.error?.message?.includes(key))
            return this.props.locale.erro[key];
        }
        return null;
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
