import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import moment from 'moment'

import { withLocale, withNotify } from "../../components/HighOrder/";

import {
  Card,
  Grid,
  Container,
  makeStyles,
  Paper,
  Button
} from "../../components/UI/";

import * as actions from "../../store/index";


import noImg from "../../assets/icons/no-image-icon.png";

const { innerWidth: width, innerHeight: height } = window;

const Quiz = (props) => {
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.quiz.questions);
  const start = useSelector((state) => state.quiz.start);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(actions.startTimer())
  }, [])

  useEffect(() => {
    if (!questions && !loading) {
      dispatch(actions.fetchQuestions())
    } else {
      let formulario = null;
      for (const key in questions) {
        formulario = { ...formulario, ...{ [questions[key].id]: '' } }
      }

      setForm(formulario)
    }
  }, [questions])

  const handleChange = (event) => {
    let formulario = form;
    formulario[event.target.name] = event.target.value;
    setForm(formulario)
  };

  const isFormValid = () => {
    if (loading) return false

    for (const key in form) {
      if (!(!!form[key]))
        return false
    }

    return true;
  };

  const onSubmit = async () => {
    setLoading(true);
    let acertos = 0;
    for (const key in questions) {
      if (form[questions[key].id] == questions[key].resposta)
        acertos = acertos + 1;
    }
    const nota = acertos > 0 
    ? ((acertos / questions.length) * 10).toFixed(1) 
    : 0

    await dispatch(actions.setNota(form, nota))

    // setLoading(false);

    props.history.push({
      pathname: "/resultado",
    });
  };

  const [counter, setCounter] = React.useState(60 * 15);

  // Third Attempts
  React.useEffect(() => {
    if (counter == 0)
      onSubmit();

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const classes = useStyles();
  return (
    <Container container component="main">
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.countdown}>
              <div className={classes.bold}>Tempo: {Math.floor(counter / 60)}min {Math.floor(counter % 60)}seg </div>
            </div>
            <div className={classes.submit}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!isFormValid()}
                onClick={() => onSubmit()}
              >
                {!loading ? "Finalizar" : "Processando"}
              </Button>
            </div>
            <div className={classes.questionContainer}>
              <div>
                {
                  questions?.map((question, index) => (
                    <Paper key={'question' + index}>
                      <span className={classes.enunciado}>
                        <span className={classes.bold}>Pergunta {index + 1}</span>: {question.enunciado}
                      </span>
                      <div className={classes.row}>
                        {
                          question.imagem ?
                            <img
                              src={question.imagem ? question.imagem : noImg}
                              height={"512"}
                              width={"512"}
                              alt={"no img"}
                            />
                            : null
                        }
                        <br />
                        <div>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">{question.pergunta}</FormLabel>
                            <RadioGroup aria-label={question.id} name={question.id} value={form && form[question.id] ? form[question.id] : ''} onChange={handleChange}>
                              {
                                question?.alternativas?.map((alternativa, index) => (
                                  <FormControlLabel key={'alternativa' + index} value={alternativa} control={<Radio />} label={alternativa} />
                                ))
                              }
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>
                    </Paper>
                  ))
                }
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
  card: {
    marginTop: "8px",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px 5px 5px 5px",
    backgroundColor: '#00cc66'
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#00cc66'
  },
  enunciado: {
    fontSize: 18,
    textAlign: 'justify',
    textJustify: 'inter-word',    
  },
  text: {
    fontSize: 12,
    textAlign: 'left'
  },
  bold: {
    fontWeight: 'bold'
  },
  row: {
    textAlign: "center",
    elevation: 5,
    padding: 20,
    marginBottom: 20
  },
  countdown: {
    position: "fixed",
    bottom: 50,
    left: 80,
    backgroundColor: '#00cc66',
    borderRadius: 50,
  },
  submit: {
    position: "fixed",
    bottom: 50,
    right: 80
  }
}));

export default withNotify(withLocale(Quiz));
