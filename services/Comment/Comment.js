import api from "../../utils/FetchApi";

export const GetCommentCard = async (page) => {
  const response = await api.get(`/todos?page=${page}&limit=3`);
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
