import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const SignUpUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/sigin`, data);
  return response.data;
};

export const SignInUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/sigin`, data);
  return response.data;
};
