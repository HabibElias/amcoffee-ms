<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

import AuthButton from "../auth-button.vue";
import UserAvatar from "./userAvatar.vue";

const authStore = useAuthStore();
</script>

<template>
  <header class="flex items-center justify-between">
    <!-- logo -->
    <NuxtLink to="/">
      <img
        class="w-20 dark:invert dark:brightness-0"
        src="../../assets/images/logo.png"
      >
    </NuxtLink>

    <nav class="flex items-center gap-10">
      <AppToggleColor />
      <UserAvatar v-if="!authStore.loading && authStore.user" />
      <AuthButton v-else />
    </nav>
  </header>
</template>
