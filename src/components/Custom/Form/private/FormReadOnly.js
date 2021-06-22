import React, { useState } from "react";

import Input from "../../Input/Input";

const FormReadOnly = (props) => {
  const form = { ...props.form };

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
      readOnly
    />
  ));

  return <div>{formInputs}</div>;
};

export default FormReadOnly;
