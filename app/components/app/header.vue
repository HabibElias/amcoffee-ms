<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import AuthButton from "../auth-button.vue";
import UserAvatar from "./userAvatar.vue";

const authStore = useAuthStore();
</script>

<template>
  <header class="flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
    <!-- logo -->
    <NuxtLink class="overflow-clip " to="/">
      <img
        class="dark:invert h-20 object-center object-cover dark:brightness-0"
        src="../../assets/images/logo.png"
      >
    </NuxtLink>

    <nav class="flex items-center gap-10">
      <AppToggleColor />
      <UserAvatar v-if="!authStore.loading && authStore.user" />
      <AuthButton v-else :on-nav="true" />
    </nav>
  </header>
</template>
