import React, { useState } from "react";

import Input from "../../Input/Input";
import { Button, makeStyles } from "../../../UI";

import {
  updateObject,
  checkValidity,
  maskHandler,
  toBase64,
} from "../../../../helpers/utility";

const FormEditable = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({ ...props.form });
  const [isValid, setIsValid] = useState(!!props.isValid);

  const inputChangedHandler = (event, controlName) => {
    const value = maskHandler(
      event.target.value,
      form[controlName].config.mask
    );
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        value: value,
        valid: checkValidity(value, form[controlName].validation),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in form) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    setForm(updatedControls);
    setIsValid(formIsValid);
  };

  const switchChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        value: event.target.checked,
        valid: checkValidity(
          event.target.checked,
          form[controlName].validation
        ),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in form) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    setForm(updatedControls);
    setIsValid(formIsValid);
  };

  const imageHandler = async (event, controlName) => {
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        value: await toBase64(event.target.files[0]),
        valid: checkValidity(
          await toBase64(event.target.files[0]),
          form[controlName].validation
        ),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in form) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }
    setForm(updatedControls);
    setIsValid(formIsValid);
  };

  const submit = async (event) => {
    event.preventDefault();
    props.submit(form);
  };

  const formArray = [];
  for (let key in form) {
    formArray.push({
      id: key,
      obj: form[key],
    });
  }

  let formInputs = formArray.map((formElement) => (
    <Input
      key={formElement.id}
      id={formElement.id}
      config={formElement.obj.config}
      value={formElement.obj.value}
      valid={formElement.obj.valid}
      validation={formElement.obj.validation}
      touched={formElement.obj.touched}
      override={formElement.obj.override}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      switch={(event) => switchChangedHandler(event, formElement.id)}
      upload={(event) => imageHandler(event, formElement.id)}
    />
  ));

  return (
    <form onSubmit={submit}>
      {formInputs}
      <p className={classes.erro}>{props.erro ? props.erro : null}</p>
      <div className={classes.actions}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          {props.submitText ? props.submitText : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  actions: {
    textAlign: "center",
  },
  erro: {
    color: "red",
  },
}));

export default FormEditable;
