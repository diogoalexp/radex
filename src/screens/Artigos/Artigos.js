import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { withLocale, withNotify } from "../../components/HighOrder/";
import { Form } from "../../components/Custom/";

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
  Paper
} from "../../components/UI/";

import * as actions from "../../store/index";

const { innerWidth: width, innerHeight: height } = window;

const Artigos = (props) => {
  const { locale, notify } = props;
  const dispatch = useDispatch();


  console.log('window', window)


  const [erro, setErro] = useState(null);
  const [PDF, setPDF] = useState(null);

  const artigos = [
    {
      nome: "Protocolo Clínico e Diretrizes Terapêuticas Osteoporose",
      file: "https://firebasestorage.googleapis.com/v0/b/radex-5e198.appspot.com/o/artigos%2FProtocoloCl%C3%ADnicoeDiretrizes.pdf?alt=media&token=a5f96b11-8acd-4d06-8157-5277e2a696ba"
    },
    {
      nome: "Posições oficiais 2008 da Sociedade Brasileira de Densitometria Clínica ",
      file: "https://firebasestorage.googleapis.com/v0/b/radex-5e198.appspot.com/o/artigos%2FPosicoesOficiais2008.pdf?alt=media&token=181fbe64-9d01-4734-825b-6a2fa9d6decd"
    },
    {
      nome: "Osteoporose",
      file: "https://firebasestorage.googleapis.com/v0/b/radex-5e198.appspot.com/o/artigos%2FOsteoporose.pdf?alt=media&token=afa6aced-7905-47c1-ab8f-cc4de86aecdb"
    },
    {
      nome: "2019 ISCD Official Positions",
      file: "https://firebasestorage.googleapis.com/v0/b/radex-5e198.appspot.com/o/artigos%2F2019OfficialPositionsAdult.pdf?alt=media&token=df4f23da-8231-42c3-864d-9fb39ec6c9bc"
    }
  ]

  const onChange = (artigo) => {
    setPDF(artigo.file)
  }


  const classes = useStyles();
  return (
    <Container container component="main">
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.artigosContainer}>
              <Paper className={classes.artigosLeft}>
                {/* <Avatar className={classes.image} src={imgCeline} /> */}
                <span className={classes.title}>Artigos</span>
                <div>
                  {
                    artigos.map((artigo, index) => (
                      <div key={index} onClick={() => onChange(artigo)} className={index % 2 == 0 ? classes.row1 : classes.row2}>
                        <span className={classes.text}>
                          {artigo.nome}
                        </span>
                      </div>
                    ))
                  }

                </div>
              </Paper>
              <div className={classes.artigosRight}>
                <div>
                  <iframe id="artigosPDF" src={PDF} className={classes.artigosPDF}></iframe>
                  {/* <object data={PDF} type="application/pdf">
                    <embed src={PDF} type="application/pdf" />
                  </object> */}
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
  artigosContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  artigosLeft: {
    flex: 1,
    maxWidth: 200,
    minHeight: height - 120,
  },
  artigosRight: {
    flex: 1,
    marginLeft: 5,
    minHeight: height - 120,
  },
  artigosPDF: {
    width: '100%',
    height: '100%',
    minHeight: height - 120,
  },
  card: {
    marginTop: "8px",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
  },
  artigosPDF: {
    width: '100%',
    height: '100%',
    minHeight: height - 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 12,
    textAlign: 'left'
  },
  row2: {
    backgroundColor: 'lightgray'
  },
  row1: {
    backgroundColor: 'gray'
  },
}));

export default withNotify(withLocale(Artigos));
