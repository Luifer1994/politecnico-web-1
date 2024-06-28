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
            <label class="form-label">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': !isValidEmail(email) && submitted }"
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
          <button type="submit" class="btn btn-danger w-100">
            Iniciar sesión
          </button>

          <span class="d-block text-center mt-3">
            ¿No tienes una cuenta?
            <router-link to="/register"> Regístrate </router-link>
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { toast } from "vue3-toastify";

const { login } = useAuth();

const email = ref("");
const password = ref("");
const submitted = ref(false);

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  submitted.value = true;

  if (!email.value || !isValidEmail(email.value) || !password.value) {
    toast.error("Por favor, completa los campos correctamente.");
    return;
  }

  await login(email.value, password.value);
};
</script>

<style scoped></style>
