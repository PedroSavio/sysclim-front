import { type ApiResponse } from "../../shared/types/Actions";
import useUserStore from "../store/user";
import useGlobalStore from "../store/global";

interface handleError {
  response?: ApiResponse;
}

const handleError = (response?: ApiResponse): string => {
  if (!response?.data) {
    console.log(response)
    console.log("Erro interno no servidor. Tente novamente mais tarde")
    return "Erro interno no servidor. Tente novamente mais tarde";
  }

  if (response.data.statusCode === 500) {
    return "Erro interno no servidor";
  }

  if (response.data.statusCode === 401 || response.data.statusCode === 403) {
    useGlobalStore.getState().setError(response.data.message)
    useUserStore.getState().logout();
  }

  return response.data.message;
}; 

export default handleError;