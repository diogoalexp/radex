import React from "react";
import { useSelector } from "react-redux";

import { withLocale, withNotify } from "../../components/HighOrder/";

import {
  Card,
  Grid,
  Container,
  makeStyles,
  Button
} from "../../components/UI/";

const Resultado = (props) => {

  const nota = useSelector((state) => state.quiz.nota);

  const onReturn = async () => {
    props.history.push({
      pathname: "/perfil",
    });
  };

  const classes = useStyles();
  return (
    <Container container component="main">
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.text}>Você tirou nota <span className={classes.bold}>{nota}</span>!</div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => onReturn()}
            >
              {"Voltar"}
            </Button>
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
  card: {
    textAlign: "center",
    marginTop: "8px",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
    backgroundColor: '#00cc66'
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    marginBottom: 50
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 70,
  }
}));

export default withNotify(withLocale(Resultado));
