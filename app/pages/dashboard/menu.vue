<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";

const menuStore = useMenuStore();

if (!menuStore.getMenuItems().value) {
  menuStore.init();
}
</script>

<template>
  <div v-if="menuStore.pending" class="w-full h-[60%] flex items-center justify-center">
    <Loader2 class="animate-spin" />
  </div>
  <div v-else class="relative">
    <!-- header -->
    <div class="flex items-center justify-between mb-6 sticky py-3 top-30 z-20">
      <span class="text-2xl">Menu</span>

      <AppAddMenuDialog />
    </div>
    <div class="mt-3">
      <div
        v-if="menuStore.getMenuItems().value && menuStore.getMenuItems().value!.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AppMenuCard
          v-for="item in menuStore.getMenuItems().value"
          :key="item.id"
          v-bind="item"
        />
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
