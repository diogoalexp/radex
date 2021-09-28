import React from "react";

import { Form } from "../../Custom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "../../UI";

const DialogForgotPassword = (props) => {
  const formEmail = {
    email: {
      config: {
        type: "email",
        placeholder: "E-mail",
        label: "E-mail",
        errorText: "E-email inválido"
      },
      validation: {
        required: true,
        isEmail: true,
      },
      override: {
        autoComplete: "email"
      }
    },
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Recuperar senha</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para recuperar sua senha, por favor insira abaixo o e-mail vinculado a
          conta. Uma nova senha será enviada para o seu e-mail
        </DialogContentText>
        <Form form={formEmail} submit={props.submit} submitText={"Enviar"} />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary" variant="contained">
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForgotPassword;
