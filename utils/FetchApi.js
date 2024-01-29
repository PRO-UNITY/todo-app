import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
const api2 = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL2,
});

api.interceptors.request.use(
  async (config) => {
    const authToken = await AsyncStorage.getItem("token");
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api2.interceptors.request.use(
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
    }
    return Promise.reject(error);
  }
);

export { api, api2 };
