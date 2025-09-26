<script setup lang="ts">
import { Loader2, LucideChevronLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";

const orderStore = useOrderStore();
const pending = ref<boolean>(true);
const orders = orderStore.get_dated_orders;

const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
const date = Number.parseInt(route.params.date as string ?? "") as number;

if (!Number.isInteger(date)) {
  navigateTo(route.redirectedFrom ?? "/dashboard");
  toast.error("Date Param is not correct");
}

pending.value = true;
try {
  const fetched_dated_orders = await $fetch(`/api/orders/date/${date}`);

  orderStore.set_dated_orders(fetched_dated_orders);
}
catch (error) {
  console.error(error);
}
finally {
  pending.value = false;
}
</script>

<template>
  <div class="p-4">
    <UiButton class="mb-4" @click="navigateTo('/dashboard/order')">
      <LucideChevronLeft />
      Back to Orders
    </UiButton>
    <div v-if="pending" class="flex items-center justify-center min-h-[50vh]">
      <Loader2 class="animate-spin" />
    </div>
    <div v-else>
      <h3 class="text-lg font-semibold mb-2 flex items-center justify-between">
        Orders for {{ new Date(date).toLocaleDateString() }}
        <div v-if="orders" class="rounded-full bg-accent px-3 pb-0.5 pt-1">
          {{ orders.length }}
        </div>
      </h3>
      <div class="space-y-2 mb-10">
        <div v-if="orders && orders.length > 0" class="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          <AppOrderCard v-for="order in orders" :key="order.id" :order="order" :dated-order="true" />
        </div>
        <div v-else class="dark:text-gray-400 text-[#8B5C2A]/70">
          No orders at {{ new Date(date).toLocaleDateString() }}.
        </div>
      </div>
    </div>
  </div>
</template>
