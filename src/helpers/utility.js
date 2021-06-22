export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value?.toString().trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value?.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value?.length <= rules.maxLength && isValid;
  }

  if (rules.exactLength) {
    isValid = value?.length === rules.exactLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.numeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.week) {
    const pattern = /[YN]/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.cpf) {
    const pattern = /([\d]{3}.[\d]{3}.[\d]{3}-[\d]{2})/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.cnpj) {
    const pattern = /([\d]{2}.[\d]{3}.[\d]{3}\/[\d]{4}-?[\d]{2})/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.cpfORcpnj) {
    const pattern = /([\d]{2}.[\d]{3}.[\d]{3}\/[\d]{4}-?[\d]{2})|([\d]{3}.[\d]{3}.[\d]{3}-[\d]{2})/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.phone) {
    const pattern = /(\(\d{2}\)\s)(\d{4,5}-\d{4})/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const maskHandler = (value, mask) => {
  if (!mask) {
    return value;
  }

  if (mask === "cpf") {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  if (mask === "cnpj") {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,4})/, "$1/$2")
      .replace(/(\d{4})(\d)(\d)+?$/, "$1-$2$3");
  }

  if (mask === "phone") {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4})+?$/, "$1-$2");
  }

  return value;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getParam = (search, params) => {
  const query = new URLSearchParams(search);
  let result = {};
  let i = 0;
  for (let entry of query.entries()) {
    if (params.find((p) => p === entry[i])) {
      result = { ...result, [entry[i]]: entry[i + 1] };
    }
    i = i + 2;
  }
  return result;
};

export const loadForm = (form, object) => {
  let result = {};
  for (let key in form) {
    let node = { ...form[key] };
    node.value = object[key];

    // if(key === 'text' && !node.value) node.value = "";
    // if(key === 'textArea' && !node.value) node.value = "";
    // if(key === 'number' && !node.value) node.value = "";
    // if(key === 'date' && !node.value) node.value = "";
    // if(key === 'checkbox' && !node.value) node.value = false;
    // if(key === 'select' && !node.value) node.value = "";
    // if(key === 'select-multiple' && !node.value) node.value = [];

    node.valid = checkValidity(node.value, node.validation);
    result[key] = node;
  }
  return result;
};

const text = require("../locales/pt-BR.json");
export function getText({ key }) {
  return text[key];
}
