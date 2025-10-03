<script setup lang="ts">
const menuStore = useMenuStore();

if (!menuStore.getMenuItems().value) {
  menuStore.init();
}
</script>

<template>
  <NuxtLayout name="custom">
    <NuxtPage />
  </NuxtLayout>
</template>
