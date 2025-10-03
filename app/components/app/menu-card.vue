<script setup lang="ts">
import { Coffee, CookieIcon, Trash2 } from "lucide-vue-next";

const props = defineProps<{
  id: number;
  type: "food" | "drink";
  image: string | null;
  name: string;
  price: number;
}>();

const menuStore = useMenuStore();
</script>

<template>
  <Motion
    class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 hover:shadow-sm duration-200 p-6 flex flex-1 flex-col"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
  >
    <div class="flex flex-col items-start mb-2">
      <img
        :src="props.image ?? '/menu_placeholder.png'"
        alt="image"
        :class="props.image ? 'w-full h-50 mr-3 object-cover mb-3 rounded-lg' : 'w-full h-50 mr-3 object-contain p-2 mb-3 rounded-lg dark:bg-gray-50/40 dark:invert'"
      >
      <h3 class="text-lg font-semibold">
        {{ props.name }}
      </h3>
    </div>
    <div class="text-gray-400 mb-2 *:flex *:flex-row-reverse *:items-center *:justify-between">
      <div v-if="props.type === 'food'">
        <CookieIcon /> food
      </div>
      <div v-else>
        <Coffee /> drink
      </div>
    </div>
    <span class="text-primary font-bold">{{ props.price }}$</span>
    <!-- btns -->
    <div class="w-full flex items-center justify-end gap-3">
      <UiButton
        variant="outline" size="icon"
        class="btn-dark"
        @click="menuStore.handleDeleteMenuItem(props.id)"
      >
        <Trash2 />
      </UiButton>
      <AppEditMenuDialog :id="props.id" />
    </div>
  </Motion>
</template>
