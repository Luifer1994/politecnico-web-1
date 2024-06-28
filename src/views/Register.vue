<template>
  <div class="d-flex vh-100 justify-content-center align-items-center">
    <div class="card p-4" style="width: 100%; max-width: 400px">
      <div class="card-body">
        <div class="text-center">
          <img
            src="https://yt3.googleusercontent.com/ytc/AIdro_mpRvGIDuspwijbl75hTd98jRv6R_PMndVNxjqO2JFCbWA=s900-c-k-c0x00ffffff-no-rj"
            alt="Logo"
            width="150"
            class="mb-4"
          />
        </div>
        <form @submit="handleSubmit" novalidate autocomplete="off">
          <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': !name && submitted }"
              v-model="name"
              required
              autocomplete="off"
            />
            <div class="invalid-feedback">Nombre es requerido.</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              :class="{
                'is-invalid':
                  (!email && submitted) || (submitted && !isValidEmail(email)),
              }"
              v-model="email"
              required
              autocomplete="off"
            />
            <div class="invalid-feedback" v-if="!email">
              Correo electrónico es requerido.
            </div>
            <div class="invalid-feedback" v-else-if="!isValidEmail(email)">
              Correo electrónico no es válido.
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': !password && submitted }"
              v-model="password"
              required
              autocomplete="new-password"
            />
            <div class="invalid-feedback">Contraseña es requerida.</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              class="form-control"
              :class="{
                'is-invalid': confirmPassword !== password && submitted,
              }"
              v-model="confirmPassword"
              required
              autocomplete="new-password"
            />
            <div class="invalid-feedback">Las contraseñas no coinciden.</div>
          </div>

          <button type="submit" class="btn btn-danger w-100">
            Registrarse
          </button>

          <span class="d-block text-center mt-3">
            ¿Tienes una cuenta?
            <router-link to="/login"> Inicia sesión </router-link>
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUser } from "@/composables/useUser";
import type { User } from "@/stores/userStore";
import { toast } from "vue3-toastify";

const { addUser } = useUser();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const name = ref("");
const submitted = ref(false);

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  submitted.value = true;

  if (
    !name.value ||
    !email.value ||
    !isValidEmail(email.value) ||
    !password.value ||
    password.value !== confirmPassword.value
  ) {
    toast.error("Por favor, completa todos los campos correctamente.");
    return;
  }

  const user = {
    email: email.value,
    password: password.value,
    name: name.value,
  } as User;

  await addUser(user);
};
</script>

<style scoped></style>
