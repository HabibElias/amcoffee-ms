<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import AuthButton from "../auth-button.vue";
import UserAvatar from "./userAvatar.vue";

const authStore = useAuthStore();
</script>

<template>
  <header class="flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
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
      <NuxtLink
        v-if="authStore.user"
        to="/sign-out"
        class="p-2 flex items-center gap-1 group relative cursor-pointer font-medium rounded bg-white/20 dark:text-white hover:bg-red-400 transition"
      >
        <Icon name="ri:logout-box-line" size="24" />
        <span
          class="hidden sm:inline md:inline"
        >
          Logout
        </span>
        <span
          class="absolute right-full top-full ml-2 px-2 py-1 rounded bg-red-400 text-black text-xs whitespace-nowrap shadow-lg z-10 transition-opacity duration-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:hidden"
        >
          Logout
        </span>
      </NuxtLink>
    </nav>
  </header>
</template>
