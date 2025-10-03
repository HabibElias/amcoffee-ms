<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";

const menuStore = useMenuStore();

const menuItems = menuStore.getMenuItems();

const menu_filter = ref<"all" | "food" | "drink">("all");
const menu_search = ref("");

const filtered_menuItems = computed(() => {
  let items = menuItems.value;
  if (menu_filter.value !== "all") {
    items = items?.filter(item => item.type === menu_filter.value);
  }
  if (menu_search.value.trim()) {
    const searchLower = menu_search.value.trim().toLowerCase();
    items = items?.filter(item => item.name.toLowerCase().includes(searchLower));
  }
  return items;
});
</script>

<template>
  <div v-if="menuStore.pending" class="w-full h-[60%] flex items-center justify-center">
    <Loader2 class="animate-spin" />
  </div>
  <div v-else class="relative">
    <!-- header -->
    <div class="flex items-center justify-between mb-6 sticky py-3 top-20 z-20 bg-background">
      <span class="text-2xl">Menu</span>

      <AppAddMenuDialog />
    </div>
    <div class="mt-3">
      <div class="flex flex-col md:flex-row gap-2 mb-4">
        <select v-model="menu_filter" class="border rounded px-3 py-2 bg-background text-sm">
          <option value="all">
            All
          </option>
          <option value="food">
            Food
          </option>
          <option value="drink">
            Drink
          </option>
        </select>
        <UiInput
          v-model="menu_search"
          type="text"
          placeholder="Search menu by name..."
          class="border rounded px-3 py-2 flex-1 bg-background text-base"
        />
      </div>
      <div
        v-if="filtered_menuItems && filtered_menuItems.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AppMenuCard
          v-for="item in filtered_menuItems"
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
