//src/composables/useAuth.ts
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import router from "@/router";

export const useAuth = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const { userLogged } = storeToRefs(authStore);

  const login = (email: string, password: string) => {
    const user = userStore.findUser(email, password);
    if (user) {
      authStore.setUser(user);
      router.push({ name: "home" });
      toast.success("Bienvenido");
    } else {
      toast.error("Credenciales incorrectas. Regístrate si no tienes cuenta.");
    }
  };

  const logout = () => {
    authStore.logout();
    toast.success("Sesión cerrada");
    router.push({ name: "login" });
  };

  return { userLogged, login, logout };
};
