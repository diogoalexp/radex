import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import firebase from "firebase";
import config from "../config";

import AnonymousRoutes from "./AnonymousRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

import Layout from "../components/Layout/Layout";
import { SnackbarProvider } from "notistack";
import { Collapse, Button } from "@material-ui/core/";

import * as actions from "../store/index";


const MainRouter = () => {
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const autenticado = useSelector((state) => state.auth.token !== null);
  const [fbReady, setFbReady] = useState(false);
  const dispatch = useDispatch();

  window.scrollTo(0, 0);

  useEffect(() => {
    if (!fbReady) {
      firebase.initializeApp(config.firebase);
      setFbReady(true);
    }
  }, [])

  useEffect(() => {
    if (!didTryAutoLogin)
      dispatch(actions.tryAutoLogin());
  }, [didTryAutoLogin]);



  if (!fbReady || !didTryAutoLogin) return null;

  let routes = <AnonymousRoutes />;

  if (autenticado) routes = <AuthenticatedRoutes />;

  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Collapse}
      dense
      preventDuplicate
      action={(key) => <Button onClick={onClickDismiss(key)}>✖️</Button>}
    >
      <Layout>{routes}</Layout>
    </SnackbarProvider>
  );
};

export default withRouter(MainRouter);
