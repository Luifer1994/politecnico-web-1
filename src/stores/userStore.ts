// src/stores/userStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export interface User {
  name: string;
  email: string;
  password: string;
}

export const useUserStore = defineStore("userStore", () => {
  const users = ref<User[]>(JSON.parse(localStorage.getItem("users") || "[]"));

  const addUser = (user: User) => {
    if (users.value.find((u) => u.email === user.email)) {
      throw new Error("El email ya está registrado.");
    }
    users.value.push(user);
    localStorage.setItem("users", JSON.stringify(users.value));
  };

  const findUser = (email: string, password: string) => {
    return users.value.find(
      (u) => u.email === email && u.password === password
    );
  };

  return {
    users,
    addUser,
    findUser,
  };
});
