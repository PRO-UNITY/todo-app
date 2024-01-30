export const userData = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};
console.log(userData);
export const getUserData = (field, value) => {
  userData[field] = value;
};
