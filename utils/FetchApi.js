import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./baseUrl";
import { navigateToLoginPage } from "./NavigateLogin";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem("token");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("ecses");
      navigateToLoginPage();
    }
    return Promise.reject(error);
  }
);

export default api;
