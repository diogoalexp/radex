import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withLocale, withNotify } from "../../components/HighOrder/";
import { Form, Spinner } from "../../components/Custom/";

import moment from 'moment'

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
  Paper,

} from "../../components/UI/";

import * as actions from "../../store/index";

import { loadForm } from "../../helpers/utility";

import formPerfil from "./FormPerfil.json";

const Perfil = (props) => {
  const classes = useStyles();
  const perfil = useSelector((state) => state.user.perfil);
  const respostas = useSelector((state) => state.user.respostas);


  const { locale, notify } = props;
  const dispatch = useDispatch();

  const [form, setForm] = useState({ ...formPerfil });
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!perfil) {
      dispatch(actions.fetchPerfil());
      setLoading(false);
    }
    else {
      setForm(loadForm({ ...formPerfil }, perfil));
      setTimeout(function () { setLoading(false); }, 500);
    }

  }, [perfil]);

  useEffect(() => {
    if (!respostas) {
      dispatch(actions.fetchRespostas());
    }
  }, [respostas]);

  const submitHandler = (form) => {

    setLoading(true);
    dispatch(
      actions.setPerfil(
        form.nome.value,
        form.idade.value,
        form.cargo.value,
        form.img
      )
    )
      .then(function () {
        notify.success(locale.global.update);
        setLoading(false);
        // props.history.goBack();
      })
      .catch(function (err) {
        notify.exception(err);
        setLoading(false);
      });
  };

  const goAvaliacao = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/avaliacao",
    });
  }

  const scoreLast = () => {
    const last = respostas?.reduce((a, b) => {
      console.log('Date(a.data)', moment(a.data))
      console.log('Date(b.data)', moment(b.data))
      return moment(a.data.toDate() ) > moment(b.data.toDate() ) ? a : b;
    });

    return last ? last.nota : 'Sem valor';
  }

  const scoreTotal = () => {
    let score = 0;
    for (const key in respostas) {
      console.log('respostas[key]', respostas[key])
      score = score + parseFloat(respostas[key].nota)
    }
    score = score > 0
    ? ((score / respostas.length)).toFixed(1)
    : 0

    return score;
  }



  if (loading) return <Spinner />;

  return (
    <Container container component="main">
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.perfilContainer}>
              <div className={classes.perfilLeft}>
                {/* <Avatar className={classes.image} src={imgCeline} /> */}
                <Form
                  form={form}
                  submit={submitHandler}
                  submitText={"Salvar"}
                  erro={erro}
                />
              </div>
              <div className={classes.perfilRight}>
                <div className={classes.perfilText}>
                  <span className={classes.title}>
                    Pontuação: {scoreTotal()}
                  </span>
                </div>
                <div className={classes.perfilText}>
                  <span className={classes.text}>
                    Última Avaliação: {scoreLast()}
                  </span>
                </div>
                <div className={classes.perfilText}>
                  <a href="" onClick={goAvaliacao} className={classes.link}>
                    Realizar nova avaliação
                  </a>
                </div>
              </div>
            </div>
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
  perfilContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  perfilLeft: {
    flex: 1,
    marginLeft: 50,
  },
  perfilRight: {
    flex: 1,
    margin: 50,
  },
  perfilText: {
    flex: 1,
    marginTop: 50,
    marginLeft: 100,
    width: '100%',
    textAlign: 'left'
  },
  card: {
    marginTop: "8px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  text: {
    fontSize: 24
  },
  link: {
    fontSize: 18
  }
}));

export default withNotify(withLocale(Perfil));
