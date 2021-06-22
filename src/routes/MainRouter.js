import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import firebase from "firebase";
import config from "../config";

import AnonymousRoutes from "./AnonymousRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

import Layout from "../components/Layout/Layout";

import * as actions from "../store/index";


const MainRouter = () => {
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const autenticado = useSelector((state) => state.auth.token !== null);
  const [fbReady, setFbReady] = useState(false);
  const dispatch = useDispatch();

  window.scrollTo(0, 0);

  useEffect(() => {
    dispatch(actions.tryAutoLogin());
  }, []);


  useEffect(() => {
    if (!fbReady) {
      firebase.initializeApp(config.firebase);
      setFbReady(true);
    }
  }, []);

  if (!fbReady || !didTryAutoLogin) return null;

  let routes = <AnonymousRoutes />;

  if (autenticado) routes = <AuthenticatedRoutes />;

  return (
      <Layout>
        {routes}
      </Layout>
  );
};

export default withRouter(MainRouter);
