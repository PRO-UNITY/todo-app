export const userData = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};
export const getUserData = (field, value) => {
  if (!field || !value) return;
  userData[field] = value;
};
