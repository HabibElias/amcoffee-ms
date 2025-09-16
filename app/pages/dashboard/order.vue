<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";

const { data: orders_by_date, pending } = await useFetch("/api/orders");

// function isToday(date: number) {
//   const d = new Date(date * 1000);
//   const now = new Date();
//   return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
// }

function formatDate(date: number) {
  const d = new Date(date * 1000);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
</script>

<template>
  <div v-if="pending" class="w-full h-[60%] flex items-center justify-center">
    <Loader2 class="animate-spin" />
  </div>
  <div v-else>
    <!-- header -->
    <div class="flex items-center justify-between mb-6">
      <span class="text-2xl">Orders</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Today's Orders -->
      <div class="lg:col-span-2">
        <h3 class="text-lg font-semibold mb-2">
          Today's Orders
        </h3>
        <ul class="space-y-2 mb-10">
          <!-- <li v-for="order in orders_by_date.filter(o => isToday(o.date))" :key="order.date" class="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
            <span>{{ formatDate(order.date) }}</span>
            <span class="font-bold">{{ order.count }}</span>
          </li>
           -->
          <li class="dark:text-gray-400 text-[#8B5C2A]/70">
            No orders today.
          </li>
        </ul>
        <AppAddOrderDialog />
      </div>

      <!-- Orders by Date -->
      <div>
        <h3 class="text-lg font-semibold mb-2">
          Orders by Date
        </h3>
        <ul class="space-y-2">
          <li v-for="order in orders_by_date?.reverse()" :key="order.date" class="flex justify-between items-center p-2 bg-gray-100 dark:bg-[#141414] rounded">
            <span>{{ formatDate(order.date) }}</span>
            <span class="font-bold">{{ order.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
