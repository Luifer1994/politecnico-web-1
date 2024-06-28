<template>
  <nav class="navbar bg-danger">
    <div class="container-fluid d-flex align-items-center">
      <a class="navbar-brand d-flex align-items-end" href="#">
        <img
          src="https://politecnicointernacional.edu.co/sw/sites/default/files/styles/cms_bootstrap_10_12/public/glazed-cms-media/slogan-poli-blanco.png?itok=iW5-EJQF"
          alt="Logo"
          width="150"
          height="auto"
          class="d-inline-block align-text-top"
        />
      </a>
      <div class="ms-auto d-flex align-items-center dropdown">
        <img
          src="https://www.gravatar.com/avatar/"
          alt="Avatar"
          width="40"
          height="40"
          class="rounded-circle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item">
              <strong>{{ userLogged?.name }}</strong>
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="#" @click="logout">Cerrar sesión</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <pre>
    
  </pre>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
const { userLogged, logout } = useAuth();

</script>

<style scoped>
.navbar-brand {
  display: flex;
  align-items: flex-end;
}

.ms-auto {
  margin-left: auto;
}

.rounded-circle {
  border-radius: 50%;
}
</style>
