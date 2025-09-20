<script setup lang="ts">
const route = useRoute();
const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "ri:dashboard-horizontal-fill",
    isActive: (route: ReturnType<typeof useRoute>) => route.name === "dashboard",
  },
  {
    to: "/dashboard/menu",
    label: "Menu",
    icon: "ri:cup-fill",
    isActive: (route: ReturnType<typeof useRoute>) => route.fullPath === "/dashboard/menu",
  },
  {
    to: "/dashboard/order",
    label: "Order",
    icon: "ri:list-ordered-2",
    isActive: (route: ReturnType<typeof useRoute>) => route.fullPath === "/dashboard/order",
  },
  {
    to: "/dashboard/withdraw",
    label: "Withdraw",
    icon: "ri:money-dollar-box-fill",
    isActive: (route: ReturnType<typeof useRoute>) => route.fullPath === "/dashboard/withdraw",
  },
];

const menuStore = useMenuStore();

if (!menuStore.getMenuItems().value) {
  menuStore.init();
}
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-[70vh]">
    <!-- Sidebar -->
    <nav
      class="w-full md:w-52 text-sm md:text-[1rem] md:min-h-100 relative dark:text-white shadow-[1px_2px_2px] dark:shadow-[#8B5C2A]/40 mt-4 md:sticky m-0 md:top-30 md:h-[70vh] gap-y-3 flex md:flex-col flex-row"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex gap-1 relative px-4 group py-2 items-center font-semibold md:mb-0 md:mt-0 transition-colors border-l-4 bg-[#8B5C2A]/10 text-[#8B5C2A] hover:bg-[#583b1b]/10 border-l-[#8B5C2A] dark:bg-gray-900 dark:text-[#F3E9DD] dark:hover:bg-[#2d1a0a]/40 dark:border-l-[#F3E9DD]"
        :class="[
          link.isActive(route)
            ? ''
            : 'border-l-transparent bg-transparent text-[#8B5C2A] dark:text-[#F3E9DD] dark:bg-transparent dark:border-l-transparent',
        ]"
      >
        <Icon :name="link.icon" size="24" />
        <span
          class="hidden sm:inline md:inline"
        >
          {{ link.label }}
        </span>
        <span
          class="absolute left-full ml-2 px-2 py-1 rounded bg-[#8B5C2A]/90 text-white text-xs whitespace-nowrap shadow-lg z-10 transition-opacity duration-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:hidden"
        >
          {{ link.label }}
        </span>
      </NuxtLink>
      <div class="absolute right-0 md:bottom-0 md:w-full">
        <NuxtLink
          to="/settings"
          class="flex group relative self-end gap-1 px-4 py-2 items-center font-semibold md:mb-0 md:mt-0 transition-colors border-l-4 hover:bg-[#583b1b]/10 dark:hover:bg-[#2d1a0a]/40 border-l-transparent bg-transparent text-[#8B5C2A] dark:text-[#F3E9DD] dark:bg-transparent dark:border-l-transparent"
        >
          <Icon name="ri:settings-2-fill" size="24" />
          <span
            class="hidden sm:inline md:inline"
          >
            Settings
          </span>
          <span
            class="absolute right-full ml-2 px-2 py-1 rounded bg-[#8B5C2A]/90 text-white text-xs whitespace-nowrap shadow-lg z-10 transition-opacity duration-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:hidden"
          >
            Settings
          </span>
        </NuxtLink>
      </div>
    </nav>
    <!-- Page content -->
    <main class="flex-1 p-4">
      <NuxtPage />
    </main>
  </div>
</template>
