/* src/stores/authStore.ts */
import { defineStore } from "pinia";
import type { User } from "./userStore";

interface AuthState {
  userLogged: User | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    userLogged: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  }),

  actions: {
    setUser(user: User) {
      this.userLogged = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.userLogged = null;
      localStorage.removeItem("user");
    },
  },
});
