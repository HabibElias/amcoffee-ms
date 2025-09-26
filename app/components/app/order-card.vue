<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";

const props = defineProps<{
  order: Order;
  datedOrder?: boolean;
}>();

const orderStore = useOrderStore();

const menuItems = useMenuStore().getMenuItems();
</script>

<template>
  <div class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xs p-6 mb-6 border border-gray-200 dark:border-[#222]">
    <div class="flex items-center justify-between mb-4">
      <div>
        <span class="font-semibold text-base text-primary">Order #{{ props.order.id }}</span>
      </div>
      <span class="bg-accent-foreground text-accent text-xs px-3 py-1 rounded-full">
        {{ props.order.orderItem.length }} items
      </span>
    </div>
    <div class="grid grid-cols-3 gap-4 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
      <span>Name</span>
      <span>Quantity</span>
      <span class="text-end">Total Price</span>
    </div>
    <div v-for="item in props.order.orderItem" :key="item.menuId" class="grid grid-cols-3 gap-4 items-center py-2 border-b last:border-b-0 border-gray-100 dark:border-[#222]">
      <span class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-100">
        {{ menuItems?.find(menuItem => Number(item.menuId) === menuItem.id)?.name || "No Item found" }}
      </span>
      <span class="text-start text-sm">{{ item.quantity }}</span>
      <span class="text-end text-sm font-semibold">
        {{
          (() => {
            const menuItem = menuItems?.find(menuItem => Number(item.menuId) === menuItem.id);
            return menuItem ? (menuItem.price * item.quantity).toLocaleString() : "-";
          })()
        }}$
      </span>
    </div>
    <div class="flex justify-end mt-4">
      <span class="text-base font-bold text-primary">
        Total: {{
          props.order.orderItem.reduce((sum, item) => {
            const menuItem = menuItems?.find(menuItem => Number(item.menuId) === menuItem.id);
            return sum + (menuItem ? menuItem.price * item.quantity : 0);
          }, 0).toLocaleString()
        }}$
      </span>
    </div>
    <div class="text-end text-xs">
      created by {{ props.order.user?.name }} ({{ props.order.user?.email }})
    </div>
    <!-- btns -->
    <div class="w-full flex items-center justify-start gap-3">
      <UiButton
        variant="outline" size="icon"
        class="btn-dark"
        @click.prevent="datedOrder ? orderStore.handleDeleteDatedOrder(props.order.id) : orderStore.handleDeleteOrder(props.order.id)"
      >
        <Trash2 />
      </UiButton>
      <AppEditOrderDialog :id="props.order.id" :dated-order="datedOrder" />
    </div>
  </div>
</template>
