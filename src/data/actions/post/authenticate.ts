/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type IUser } from "@/shared/types/User";
import { jwtDecode } from "jwt-decode";
import { api } from "../../../domain/config/api";
import { type Either, left, right } from '@/shared/types/Actions';
import handleError from "../../../domain/interceptors/handleError";

export const authenticate = async (
  username: string,
  senha: string
): Promise<Either<string, { user: Omit<IUser,'senha'>; token: string }>> => {
  try {
    const res = await api.post<{ token: string }>("/user/login", {
      username,
      senha,
    });

    const decode = jwtDecode<Omit<IUser,'senha'>>(res.data.token);

    return right({
      user: {
        id: decode.id,
        nome: decode.nome,
        username: decode.username,
        role: decode.role,
      },
      token: res.data.token,
    });
  } catch (error: any) {
    return left(handleError(error.response));
  }
};