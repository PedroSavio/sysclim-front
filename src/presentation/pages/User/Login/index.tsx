import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";

export const LoginSchema = z.object({
  username: z.string().nonempty("CPF obrigatório"),
  senha: z.string().nonempty("Senha obrigatório"),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export default function Login () {
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      senha: ""
    }
  });

  const form = watch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    console.log(form.username)
    const status = await signIn(form.username, form.senha);

    if (status) {
      setError("senha", {
        message: status
      });
    }else{
      console.log("entrou")
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div>
          <form className="w-full max-w-md shadow-md bg-blue-600 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Sysclim</h2>
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-white font-bold mb-2">CPF</label>
              <Input
                id="username"
                type="text"
                className="shadow text-gray-700"
                {...register("username")}
              />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>
            <div className="mb-6">
              <label htmlFor="senha" className="block text-white font-bold mb-2">Senha</label>
              <Input
                id="senha"
                type="password"
                className="shadow text-gray-700"
                {...register("senha")}
              />
              {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
            </div>
            <Button
              onClick={handleSubmit(handleLogin)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
              type="button"
            >
              Entrar
            </Button>
          </form >
        </div>
      </div>
    </>
  );
};