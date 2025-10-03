<template>
  <div class="container mx-auto py-8 px-2">
    <h1 class="text-2xl w-full py-3  font-bold mb-6">
      Dashboard
    </h1>
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
        <span class="text-gray-400 text-xs mb-1">Total Orders</span>
        <span class="text-3xl font-bold">123</span>
      </div>
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
        <span class="text-gray-400 text-xs mb-1">Total Revenue</span>
        <span class="text-3xl font-bold">$4,560</span>
      </div>
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start">
        <span class="text-gray-400 text-xs mb-1">Total Withdraws</span>
        <span class="text-3xl font-bold">$1,200</span>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6">
        <h2 class="text-lg font-semibold mb-2">
          Orders Over Time
        </h2>
        <div class="h-56 flex items-center justify-center text-gray-400">
          <!-- Replace with chart component -->
          <span>Chart.js or ApexCharts orders line chart here</span>
        </div>
      </div>
      <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6">
        <h2 class="text-lg font-semibold mb-2">
          Revenue Breakdown
        </h2>
        <div class="h-56 flex items-center justify-center text-gray-400">
          <!-- Replace with chart component -->
          <span>Chart.js or ApexCharts revenue pie chart here</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity Table Placeholder -->
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
                Customer
              </th>
              <th class="py-2 px-4">
                Total
              </th>
              <th class="py-2 px-4">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4">
                123
              </td>
              <td class="py-2 px-4">
                John Doe
              </td>
              <td class="py-2 px-4">
                $45
              </td>
              <td class="py-2 px-4">
                2025-10-01
              </td>
            </tr>
            <tr>
              <td class="py-2 px-4">
                122
              </td>
              <td class="py-2 px-4">
                Jane Smith
              </td>
              <td class="py-2 px-4">
                $32
              </td>
              <td class="py-2 px-4">
                2025-09-30
              </td>
            </tr>
            <!-- More rows... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
