import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withLocale, withNotify } from "../../components/HighOrder/";

import {
  Card,
  Grid,
  Container,
  makeStyles,
  Paper
} from "../../components/UI/";

import * as actions from "../../store/index";

const { innerWidth: width, innerHeight: height } = window;

const Artigos = (props) => {
  const dispatch = useDispatch();

  const artigos = useSelector((state) => state.article.articles);
  const [PDF, setPDF] = useState(null);

  useEffect(() => {
    if (!artigos) {
      dispatch(actions.fetchArticles())
    }
  }, [])

  const onChange = (artigo) => {
    setPDF(artigo)
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
                    artigos?.map((artigo, index) => (
                      <div key={index} onClick={() => onChange(artigo)} className={artigo.nome == PDF?.nome ? classes.rowselected: index % 2 == 0 ? classes.row1 : classes.row2}>
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
                  <iframe id="artigosPDF" src={PDF?.file} className={classes.artigosPDF}></iframe>
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
  rowselected: {
    backgroundColor: '#00cc66',
    color: 'white'
  },
}));

export default withNotify(withLocale(Artigos));
