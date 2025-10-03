<script setup lang="ts">
const { data: analytics, pending } = await useFetch("/api/analytics");
</script>

<template>
  <div class="container mx-auto py-8 px-2">
    <h1 class="text-2xl sticky top-20 bg-background z-20 w-full py-3 font-bold mb-6">
      Dashboard
    </h1>

    <div v-if="pending" class="flex items-center justify-center h-40 text-gray-400">
      Loading analytics...
    </div>
    <template v-else>
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
          <span class="text-gray-400 text-xs mb-1">Total Orders</span>
          <span class="text-3xl font-bold">{{ analytics?.totalOrders }}</span>
        </div>
        <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
          <span class="text-gray-400 text-xs mb-1">Total Revenue</span>
          <span class="text-3xl font-bold">${{ analytics?.totalRevenue }}</span>
        </div>
        <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
          <span class="text-gray-400 text-xs mb-1">Total Withdraws</span>
          <span class="text-3xl font-bold">${{ analytics?.totalWithdraws }}</span>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6">
          <h2 class="text-lg font-semibold mb-2">
            Orders Over Time
          </h2>
          <div class="h-66 w-full flex items-center justify-center font-[poppins]">
            <UiChart
              v-if="analytics?.ordersOverTime && analytics.ordersOverTime.length"
              type="line"
              :data="{
                labels: analytics.ordersOverTime.map((o: { date: number; count: number }) => new Date(o.date).toLocaleDateString()),
                datasets: [{
                  label: 'Orders',
                  data: analytics.ordersOverTime.map((o: { date: number; count: number }) => o.count),
                  borderColor: '#6366f1',
                  backgroundColor: 'rgba(99,102,241,0.1)',
                  fill: true,
                  tension: 0.4,
                }],
              }"
              :options="{ responsive: true, plugins: { legend: { display: false } } }"
            />
            <span v-else class="text-gray-400">No data</span>
          </div>
        </div>
        <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6">
          <h2 class="text-lg font-semibold mb-2">
            Revenue Breakdown
          </h2>
          <div class="h-56 flex items-center justify-center">
            <UiChart
              v-if="analytics?.revenueBreakdown && analytics.revenueBreakdown.length"
              type="pie"
              :data="{
                labels: analytics.revenueBreakdown.map((r: { type: string; revenue: number }) => r.type),
                datasets: [{
                  label: 'Revenue',
                  data: analytics.revenueBreakdown.map((r: { type: string; revenue: number }) => r.revenue),
                  backgroundColor: ['#6366f1', '#f59e42'],
                }],
              }"
              :options="{ responsive: true, plugins: { legend: { position: 'bottom' } } }"
            />
            <span v-else class="text-gray-400">No data</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity Table -->
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6">
        <h2 class="text-lg font-semibold mb-2">
          Recent Orders
        </h2>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500">
                <th class="py-2 px-4">
                  Order #
                </th>
                <th class="py-2 px-4">
                  User ID
                </th>
                <th class="py-2 px-4">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in analytics?.recentOrders || []" :key="order.id">
                <td class="py-2 px-4">
                  {{ order.id }}
                </td>
                <td class="py-2 px-4">
                  {{ order.userId }}
                </td>
                <td class="py-2 px-4">
                  {{ new Date(order.orderDate).toLocaleDateString() }}
                </td>
              </tr>
              <tr v-if="!analytics?.recentOrders || analytics.recentOrders.length === 0">
                <td colspan="3" class="text-center text-gray-400 py-4">
                  No recent orders
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="my-8">
          <h2 class="text-lg font-semibold mb-3">
            Quick Actions
          </h2>
          <div class="flex flex-wrap gap-4">
            <AppAddOrderDialog />
            <AppAddWithdrawDialog />
            <AppAddMenuDialog />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
