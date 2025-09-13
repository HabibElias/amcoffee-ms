<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";

const { data: menu, pending } = await useFetch("/api/menu");
</script>

<template>
  <div v-if="pending" class="w-full h-[60%] flex items-center justify-center">
    <Loader2 class="animate-spin" />
  </div>
  <div v-else>
    <!-- header -->
    <div class="flex items-center justify-between mb-6">
      <span class="text-2xl">Menu</span>

      <AppAddMenuDialog />
    </div>
    <div class="mt-3">
      <div
        v-if="menu && menu.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <Motion
          v-for="item in menu"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-xs hover:shadow-md duration-200 p-6 flex flex-1 flex-col"
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
        >
          <div class="flex flex-col items-start mb-2">
            <img
              :src="item.image ?? '/menu_placeholder.png'"
              alt="image"
              class="w-full h-50 mr-3 object-contain p-2 mb-3 rounded-lg dark:bg-gray-50/40 dark:invert"
            >
            <h3 class="text-lg font-semibold">
              {{ item.name }}
            </h3>
          </div>
          <p class="text-gray-400 mb-2">
            {{ item.type }}
          </p>
          <span class="text-primary font-bold">{{ item.price }}$</span>
        </Motion>
      </div>
      <Motion
        v-else
        class="flex flex-col items-center justify-center"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
      >
        <svg width="80" height="80" fill="none" viewBox="0 0 24 24" class="mb-4 text-gray-300">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <path d="M8 12h8M8 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <rect x="8" y="8" width="8" height="2" rx="1" fill="currentColor" class="text-gray-200" />
        </svg>
        <span class="text-gray-500 text-lg">No menu items found</span>
      </Motion>
    </div>
  </div>
</template>
