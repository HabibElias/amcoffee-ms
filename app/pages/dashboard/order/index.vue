<script lang="ts" setup>
import { Eye, Loader2 } from "lucide-vue-next";

const orderStore = useOrderStore();
const today_orders = orderStore.get_today_orders;

const pending = ref<boolean>(false);

function formatDate(date: number) {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const { data: orders_by_date, pending: dated_pending } = useFetch("/api/orders");

onMounted(async () => {
  pending.value = true;
  try {
    const fetched_today_orders = await $fetch("/api/orders/today");

    orderStore.set_today_orders(fetched_today_orders);
  }
  catch (error) {
    console.error(error);
  }
  finally {
    pending.value = false;
  }
});
</script>

<template>
  <div v-if="pending" class="w-full h-[60%] flex items-center justify-center">
    <Loader2 class="animate-spin" />
  </div>
  <div v-else>
    <!-- header -->
    <div class="flex items-center justify-between mb-6 sticky top-20 py-5 z-20 bg-background">
      <span class="text-2xl">Orders</span>
      <AppAddOrderDialog />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Today's Orders -->
      <div class="lg:col-span-2">
        <h3 class="text-lg font-semibold mb-2 flex items-center justify-between">
          Today's Orders
          <div v-if="today_orders" class="rounded-full bg-accent px-3 pb-0.5 pt-1">
            {{ today_orders.length }}
          </div>
        </h3>
        <div class="space-y-2 mb-10">
          <div v-if="today_orders && today_orders.length > 0">
            <AppOrderCard v-for="order in today_orders" :key="order.id" :order="order" />
          </div>
          <div v-else class="dark:text-gray-400 text-[#8B5C2A]/70">
            No orders today.
          </div>
        </div>
      </div>

      <!-- Orders by Date -->
      <div>
        <h3 class="text-lg font-semibold mb-2">
          Orders by Date
        </h3>
        <div v-if="dated_pending" class="w-full h-[60%] flex items-center justify-center">
          <Loader2 class="animate-spin" />
        </div>
        <ul v-else class="space-y-2">
          <li v-for="order in orders_by_date" :key="order.date" class="flex justify-between items-center p-2 bg-gray-100 dark:bg-[#141414] rounded group hover:bg-gray-200 dark:hover:bg-[#1a1a1a]">
            <span class="flex items-center gap-2">
              <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                <UiButton size="icon" variant="outline" @click="navigateTo(`/dashboard/order/date/${order.date}`)">
                  <Eye />
                </UiButton>
              </span>
              {{ formatDate(order.date) }}
            </span>
            <span class="font-bold">{{ order.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
