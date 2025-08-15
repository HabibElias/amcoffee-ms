<script setup lang="ts">
const colorMode = useColorMode();
</script>

<template>
  <button @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'">
    <Motion :initial="{ scale: 1.5 }" :while-tap="{ scale: 0.9 }">
      <span v-if="colorMode.preference === 'dark'">
        <Icon name="ri:moon-fill" />
      </span>
      <span v-else>
        <Icon name="ri:sun-fill" />
      </span>
    </Motion>
  </button>
</template>
