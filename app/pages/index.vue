<script setup lang="ts">
import { NuxtLink } from "#components";

import AuthButton from "../components/auth-button.vue";

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-fit">
    <div class="text-center min-h-fit mt-10">
      <h1 class="text-4xl font-bold mb-4">
        Welcome to Anno Macchiato MS
      </h1>
      <p class="text-lg font-medium">
        Streamline your day—manage orders, track daily logs, and keep Anno Coffee running smooth and strong!
      </p>
      <div class="mt-4">
        <NuxtLink
          v-if="!authStore.loading && authStore.user"
          class="bg-[#f8f5f2] dark:hover:bg-[#926b41] hover:bg-[#8B5C2A] hover:text-white duration-200 dark:bg-[#23201c] rounded-3xl px-5 py-3 mt-13" to="/dashboard"
        >
          GetStarted
        </NuxtLink>
        <AuthButton v-else />
      </div>
    </div>

    <!-- hero -->
    <div class="flex justify-center items-center min-h-[350px] gap-6 bg-[#f8f5f2] dark:bg-[#23201c] rounded-3xl px-5 py-10 my-10">
      <Motion
        :initial="{ opacity: 0, y: -50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8 }"
        class="flex flex-col md:flex-row items-center gap-8"
      >
        <div class="flex flex-col items-center">
          <Motion
            :initial="{ x: -100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ delay: 0.2, duration: 0.6 }"
            class="bg-white dark:bg-[#2d241a] rounded-xl shadow-lg px-4 py-6 min-w-[120px] flex items-center flex-col justify-center text-center font-semibold text-[#8B5C2A] dark:text-[#e0c9b0] text-lg"
          >
            <img src="/coffee-cup.png" alt="Coffee Cup" class="w-12 h-12 mb-3">
            <span>Order Received</span>
          </Motion>
        </div>
        <Motion
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :transition="{ delay: 0.8, duration: 0.5 }"
          class="flex items-center justify-center"
        >
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path d="M5 12h14M13 18l6-6-6-6" stroke="#8B5C2A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Motion>
        <div class="flex flex-col items-center">
          <Motion
            :initial="{ y: 100, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ delay: 1.2, duration: 0.6 }"
            class="bg-white dark:bg-[#2d241a] rounded-xl shadow-lg px-4 py-6 flex items-center flex-col justify-center min-w-[120px] text-center font-semibold text-[#8B5C2A] dark:text-[#e0c9b0] text-lg"
          >
            <img src="/barista.png" alt="Barista" class="w-12 h-12 mb-3">
            <span>Being Prepared</span>
          </Motion>
        </div>
        <Motion
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :transition="{ delay: 1.8, duration: 0.5 }"
          class="flex items-center justify-center"
        >
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path d="M5 12h14M13 18l6-6-6-6" stroke="#8B5C2A" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Motion>
        <div class="flex flex-col items-center">
          <Motion
            :initial="{ x: 100, opacity: 0 }"
            :animate="{ x: 0, opacity: 1 }"
            :transition="{ delay: 2.2, duration: 0.6 }"
            class="bg-white dark:bg-[#2d241a] rounded-xl shadow-lg px-4 py-6 min-w-[120px] flex items-center flex-col justify-center text-center font-semibold text-[#8B5C2A] dark:text-[#e0c9b0] text-lg"
          >
            <img src="/tray.png" alt="Tray" class="w-12 h-12 mb-3">
            <span>Ready for Pickup</span>
          </Motion>
        </div>
      </Motion>
    </div>
  </div>
</template>
