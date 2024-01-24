import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import api from "../../utils/FetchApi";

export const GetCommentCard = async () => {
  const response = await api.get(`/todos`);
  return response.data;
};
export const isActiveFavorite = async (data) => {
  const response = await api.post(`/favourites`, data);
  return response.data;
};
export const isRemoveFavorite = async (id) => {
  const response = await api.delete(`/favourite/${id}`);
  return response.data;
};
export const AddCommentTodo = async (data) => {
  const response = await api.post(`/comments`, data);
  return response.data;
};
