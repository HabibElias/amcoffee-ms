<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const props = defineProps<{
  onNav?: boolean;
}>();

const authStore = useAuthStore();
</script>

<template>
  <UiButton :disabled="authStore.loading" class="bg-[#8B5C2A]" @click="authStore.signIn">
    <div v-if="!authStore.loading" class="flex items-center justify-center gap-1">
      <Icon name="ri:google-fill" size="18" />
      <span v-if="!props.onNav">Continue with Google</span>
    </div>
    <Icon v-else name="ri:loader-4-line" class="animate-spin" />
  </UiButton>
</template>
