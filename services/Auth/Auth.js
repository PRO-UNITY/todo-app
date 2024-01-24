import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import api from "../../utils/FetchApi";

export const SignUpUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};
export const SignInUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/sigin`, data);
  return response.data;
};
export const GetUsers = async () => {
  const response = await api.get(`/auth/users`);
  return response.data;
};
export const GetUser = async () => {
  const response = await api.get(`/auth/user`);
  return response.data;
};
