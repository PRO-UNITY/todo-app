import api from "../../utils/FetchApi";

export const CreateTodoCard = async (data) => {
  const response = await api.post(`/todos`, data);
  return response.data;
};
