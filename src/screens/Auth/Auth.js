import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { withLocale, withNotify } from "../../components/HighOrder/";
import { Form, DialogForgotPassword } from "../../components/Custom/";

import {
  Card,
  Grid,
  Link,
  Typography,
  Avatar,
  Container,
  Icons,
  makeStyles,
  Colors,
} from "../../components/UI/";

import formLogin from "./FormLogin.json";
import formRegister from "./FormRegister.json";

import * as actions from "../../store/index";

const Auth = (props) => {
  const { locale, notify } = props;
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [erro, setErro] = useState(null);

  const submitHandler = async (form) => {
    try {
      if (!isLogin) {
        if (String(form.password.value) != String(form.confirmPassword.value)) {
          setErro(locale.auth.passInvalidConfirmation);
          return notify.error(locale.auth.passInvalidConfirmation);
        }

        await dispatch(
          actions.createUserWithEmailAndPassword(form.email.value, form.password.value)
        );
        setIsLogin((prevState) => !prevState);

        return notify.success(locale.auth.passConfirmationSent);
      }

      await dispatch(
        actions.signInWithEmailAndPassword(
          form.email.value,
          form.password.value,
        )
      ).then(() => {
        props.history.push({
          pathname: "/",
        });
      });
    } catch (err) {
      const message = notify.identifyError(err);

      if (message == locale.erro.EMAIL_EXISTS)
        return setErro(locale.erro.EMAIL_EXISTS);

      if (message == locale.erro.EMAIL_NOT_FOUND)
        return setErro(locale.erro.EMAIL_NOT_FOUND);

      if (message == locale.erro.INVALID_PASSWORD)
        return setErro(locale.erro.INVALID_PASSWORD);

      if (message == locale.erro.VERIFY_PASSWORD_RESPONSE)
        return setErro(locale.erro.VERIFY_PASSWORD_RESPONSE);

      if (message == locale.erro.TOO_MANY_ATTEMPTS_TRY_LATER)
        return setErro(locale.erro.TOO_MANY_ATTEMPTS_TRY_LATER);

      notify.exception(err);
    }
  };

  const forgotPassword = (form) => {
    setIsForgotPassword(false);
    dispatch(actions.forgotPassword(form.email.value))
      .then(() => {
        notify.success(locale.auth.passNewSent);
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.code == "auth/user-not-found")
          notify.error(locale.erro.EMAIL_NOT_FOUND, err);
        else
          notify.error(locale.auth.passError, err);
      });
  };

  const classes = useStyles();
  return (
    <Container container component="main">
      <DialogForgotPassword
        open={isForgotPassword}
        onClose={() => setIsForgotPassword(false)}
        submit={forgotPassword}
      />
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Card className={classes.card}>
            <Avatar className={classes.pink}>
              <Icons.LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? locale.auth.signInTitle : locale.auth.signUpTitle}
            </Typography>
            <div className={classes.form}>
              {isLogin && (
                <Form
                  form={formLogin}
                  submit={submitHandler}
                  submitText={locale.global.signIn}
                  erro={erro}
                />
              )}
              {!isLogin && (
                <Form
                  form={formRegister}
                  submit={submitHandler}
                  submitText={locale.global.signUp}
                  erro={erro}
                />
              )}
            </div>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => setIsForgotPassword(true)} variant="body2">
                  {locale.auth.passForgot}
                </Link>
              </Grid>
              {/* <Grid item xs>
                <Link
                  onClick={() => setIsLogin((prevState) => !prevState)}
                  variant="body2"
                >
                  {isLogin ? locale.auth.signUpLink : locale.auth.signInLink}
                </Link>
              </Grid> */}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  pink: {
    color: theme.palette.getContrastText(Colors.pink[500]),
    backgroundColor: Colors.pink[500],
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5 px",
  },
  green: {
    color: "#fff",
    backgroundColor: Colors.green[500],
  },
  Auth: {
    margin: "20px auto",
    width: "80%",
    textAlign: "center",
    boxShadow: "0 2px 3px #ccc",
    border: "1px solid #eee",
    padding: "10px",
    boxSizing: "border-box",
  },
  avatar: {
    backgroundColor: "hotpink",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5px",
  },
  card: {
    marginTop: "8px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
  },
  form: {
    width: "100%",
    marginTop: "1px",
    marginBottom: "10px",
  },
}));

export default withNotify(withLocale(Auth));
