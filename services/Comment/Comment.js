import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

export const GetCommentCard = async () => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${BASE_URL}/todos`, { headers });
  return response.data;
};
export const isActiveFavorite = async (data) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.post(`${BASE_URL}/favourites`, data, {
    headers,
  });
  return response.data;
};
export const isRemoveFavorite = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(`${BASE_URL}/favourites/${id}`, {
    headers,
  });
  return response.data;
};
