import React from "react";

import { withLocale, withNotify } from "../../components/HighOrder/";

import imgHome from "../../assets/images/home.jpg";
import imgCeline from "../../assets/images/celine.jpg";
import imgAnna from "../../assets/images/anna.jpg";
import imgStefany from "../../assets/images/stefany.jpg";

import {
  Card,
  Grid,
  Avatar,
  Container,
  makeStyles,
  Colors,
} from "../../components/UI/";

const Home = (props) => {
  const classes = useStyles();
  return (
    <Container component="main">
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <img className={classes.image} src={imgHome} />
            <div className={classes.text}>
              <span>
                Site desenvolvido pela graduanda Celine Petterle Alberti na Universidade Tecnológica Federal do Paraná (UTFPR), 
                como trabalho de conclusão de curso no curso de Tecnologia em Radiologia.
              </span>
              <br />
              <span>
                Sistema desenvolvolvido com o objetivo de auxiliar em treinamento e capacitação dos profissionais em radiologia, 
                com a finalidade de fornecer protocolos e testes como recurso de desenvolvimento profissional na área de densitometria óssea, 
                com o objetivo de trazer um melhor controle de qualidade na área de radiologia.
              </span>
            </div>
            <div className={classes.avatarContainer}>
              <div className={classes.avatar}>
                <Avatar className={classes.pink} src={imgCeline} />
                <div className={classes.nome}>Celine Petterle Alberti</div>
                <div className={classes.cargo}>Autora</div>
              </div>
              <div className={classes.avatar}>
                <Avatar className={classes.pink} src={imgAnna} />
                <div className={classes.nome}>Prof(a) Anna Luiza Metidieri Cruz Malthez</div>
                <div className={classes.cargo}>Orientadora</div>
              </div>
              <div className={classes.avatar}>
                <Avatar className={classes.pink} src={imgStefany} />
                <div className={classes.nome}>Stefany Brando Mary</div>
                <div className={classes.cargo}>Co-orientadora</div>
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
  image: {
    width: 256,
    height: 256,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    flex: 1,
  },
  pink: {
    color: theme.palette.getContrastText(Colors.pink[500]),
    backgroundColor: Colors.pink[500],
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "5 px",
    width: 64,
    height: 64
  },
  card: {
    marginTop: "8px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
    marginBottom: '20px'
  },
  text: {
    fontSize: 16,
    margin: 20,
    marginBottom: 20,
    textAlign: 'justify',
    textJustify: 'inter-word'
  },
  nome: {
    fontSize: 14
  },
  cargo: {
    fontSize: 10
  }
}));

export default withNotify(withLocale(Home));
