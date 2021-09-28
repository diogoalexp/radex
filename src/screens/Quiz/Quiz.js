import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

const Quiz = (props) => {
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.quiz.questions);
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
    <Container component="main">
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
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Card className={classes.card}>
            <div className={classes.questionContainer}>
              <div>
                {
                  questions?.map((question, index) => (
                    <Paper key={'question' + index}>
                      <div className={classes.enunciado}>
                        <span className={classes.bold}>Pergunta {index + 1}: {question.enunciado} </span>
                      </div>
                      <div className={classes.row}>
                        {
                          question.imagem ?
                            <div>
                              <img
                                src={question.imagem ? question.imagem : noImg}
                                height={window.innerWidth > 500 ? "512" : "320"}
                                width={window.innerWidth > 500 ? "512" : "320"}
                                alt={"no img"}
                              />
                              <br />
                            </div>
                            : null
                        }

                        <div>
                          {question?.afirmativas ?
                            <div className={classes.afirmativas}>
                              {
                                question?.afirmativas?.map((afirmativa, index) => (
                                  <div key={'afirmativa' + index}>
                                    <span className={classes.text}>{afirmativa}</span>
                                    <br />
                                  </div>
                                ))
                              }
                            </div>
                            : null
                          }

                          <FormControl component="fieldset">
                            <FormLabel component="legend">{question.pergunta}</FormLabel>
                            <RadioGroup aria-label={question.id} name={question.id} value={form && form[question.id] ? form[question.id] : ''} onChange={handleChange}>
                              {
                                question?.alternativas?.map((alternativa, index) => (
                                  <FormControlLabel key={'alternativa' + index} value={alternativa} control={<Radio />} label={alternativa} className={classes.alternativa} />
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
  afirmativas: {
    fontSize: 18,
    textAlign: 'justify',
    textJustify: 'inter-word',
    marginBottom: 20
  },
  alternativa: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  text: {
    fontSize: 18,
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
    zIndex: 100000,
    tableLayout: 'fixed',
    top: 15,
    left: 80,
    backgroundColor: '#00cc66',
    borderRadius: 50,
  },
  submit: {
    position: "fixed",
    zIndex: 100000,
    tableLayout: 'fixed',
    bottom: 35,
    right: 15
  }
}));

export default withNotify(withLocale(Quiz));
