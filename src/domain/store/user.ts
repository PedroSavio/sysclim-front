import { CookiesEnum } from "@/shared/enum/CookiesEnum";
import { type IUser } from "@/shared/types/User";
import { create } from "zustand";
import { apiSetToken } from "../config/api";
import { authenticate } from "@/data/actions/post/authenticate";
import Cookie from "js-cookie";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  login: ({ username, senha }: SignIn) => Promise<string | undefined>;
  logout: () => void;
}

interface SignIn {
    username: string;
    senha: string;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  login: async ({username, senha}) => {
    const res = await authenticate(username, senha);
    if (res.isRight()) {
      Cookie.set(CookiesEnum.TOKEN, res.value.token, {
        expires: 1,
        // sameSite:"none"
      });
        console.log("valor", res.value)
      apiSetToken(res.value.token);
      set({ user: res.value.user });
    } else {
      return res.value;
    }
  },
  logout: () => {
    Cookie.remove(CookiesEnum.TOKEN);
    apiSetToken("");
    set({ user: null });
    window.location.reload();
    // if (window.location.pathname != window.location.href) {
    //   window.location.href = window.location.pathname;
    // }
  },
}));

export default useUserStore;