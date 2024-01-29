import axios from "axios";
import { api2 } from "../../utils";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL2;

export const SignUpUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};
export const SignInUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/sigin`, data);
  return response.data;
};
export const GetUsers = async () => {
  const response = await api2.get(`/auth/users`);
  return response.data;
};
export const GetUser = async () => {
  const response = await api2.get(`/auth/user`);
  return response.data;
};
