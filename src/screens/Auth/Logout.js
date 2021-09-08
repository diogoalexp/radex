import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Redirect } from "react-router-dom";

import * as actions from "../../store/index";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.signOut());
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
