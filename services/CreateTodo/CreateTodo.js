import { api } from "../../utils";

export const CreateTodoCard = async (data) => {
  const response = await api.post(`/todos`, data);
  return response.data;
};
