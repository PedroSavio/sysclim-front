import { createContext, FC, useEffect, useState } from "react";
import { CookiesEnum } from "@/shared/enum/CookiesEnum";
import { NavigateFunction } from "react-router-dom";
import { authenticate } from "../../data/useCases/index-util.ts";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { apiSetToken } from "@/domain/config/api";
import { IUser } from "@/shared/types/User";

export type AuthContextType = {
    user: IUser | null;
    Logout: ({ navigate }: { navigate: NavigateFunction }) => void;
    setUser: (u: IUser) => void;
    signIn: (usuario: string, senha: string) => Promise<null | string>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    Logout: () => { },
    setUser: () => { },
    signIn: async () => null,
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const cookies = new Cookies();

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = cookies.get("token");

        if (token) {
            const user = jwtDecode<IUser>(token);
            console.log(user)
            setUser(user);
        }
    }, []);

    async function signIn(usuario: string, senha: string) {
        const result = await authenticate(usuario, senha);

        if (result.isRight()) {
            setUser(result.value.user);
            console.log(result.value.token)
            cookies.set(CookiesEnum.TOKEN, result.value.token as string, {
                path: "/",
            });

            apiSetToken(result.value.token);
            return null;
        }
        return result.value;
    }

    async function Logout({ navigate }: { navigate: NavigateFunction }) {
        cookies.remove(CookiesEnum.TOKEN);
        apiSetToken("");
        setUser(null);
        navigate("/");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signIn,
                Logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 98971515;