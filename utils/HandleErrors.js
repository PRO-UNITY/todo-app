export const validationInput = {
  username: false,
  first_name: false,
  last_name: false,
  email: false,
  password: false,
  confirm_password: false,
};

export const changeFiled = (field) => {
  validationInput[field] = false;
};

export const handleInputValidation = (value) => {
  const emptyFields = Object.keys(value).filter(
    (field) => value[field].trim() === ""
  );
  if (emptyFields.length > 0) {
    emptyFields.forEach((field) => {
      validationInput[field] = true;
    });
  }
};
