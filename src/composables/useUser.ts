// src/composables/useUser.ts
import router from "@/router";
import { useUserStore, type User } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

export const useUser = () => {
  const userStore = useUserStore();
  const { users } = storeToRefs(userStore);

  const addUser = (user: User) => {
    try {
      userStore.addUser(user);
      toast.success("Usuario registrado exitosamente");
      router.push({ name: "Login" });
    } catch (error: any) {
      toast.error(error.message || "Error al registrar el usuario");
    }
  };

  return {
    users,
    addUser,
  };
};
