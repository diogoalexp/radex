import React, { useState } from "react";

import FormReadOnly from "./private/FormReadOnly";
import FormEditable from "./private/FormEditable";

const Form = (props) => {
  const { form, submit, submitText, erro, isValid } = { ...props };

  let content = (
    <FormEditable
      form={form}
      submit={submit}
      submitText={submitText}
      erro={erro}
      isValid={isValid}
    />
  );

  if (props?.readOnly) content = <FormReadOnly form={form} />;

  return content;
};

export default Form;
