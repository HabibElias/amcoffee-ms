<script lang="ts" setup>
const authStore = useAuthStore();

onMounted(() => {
  authStore.logout();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh]">
    <Icon name="ri:loader-4-line" class="animate-spin" size="34" />
    loading
  </div>
</template>
