<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="container mx-auto py-8 px-2 max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">
      Settings
    </h1>

    <!-- User Info Card -->
    <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col items-start mb-8">
      <div class="flex items-center gap-4 mb-3">
        <img
          v-if="authStore.user?.image"
          :src="authStore.user.image"
          alt="User avatar"
          class="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        >
        <div>
          <div class="font-semibold text-lg text-primary">
            {{ authStore.user?.name || 'Unknown User' }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ authStore.user?.email }}
          </div>
        </div>
      </div>
      <div class="text-xs text-gray-400 dark:text-gray-500">
        Joined: {{ authStore.user?.createdAt ? new Date(authStore.user.createdAt).toLocaleDateString() : '-' }}
      </div>
      <div class="pt-4 flex self-end">
        <NuxtLink
          to="/sign-out"
        >
          <UiButton variant="destructive">
            <Icon name="ri:logout-box-line" size="18" />
            Logout
          </UiButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Website Settings -->
    <div class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 p-6 flex flex-col gap-4">
      <h2 class="text-lg font-semibold mb-2">
        Website Settings
      </h2>
      <div class="flex items-center justify-between">
        <span class="text-base">Color Mode</span>
        <AppToggleColor />
      </div>
    </div>
  </div>
</template>
