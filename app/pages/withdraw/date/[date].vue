<script setup lang="ts">
import { Loader2, LucideChevronLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";

const withdrawStore = useWithdrawStore();
const pending = ref<boolean>(true);
const withdraws = withdrawStore.get_dated_withdraws;

const route = useRoute();

// When accessing /posts/1, route.params.id will be 1
const date = Number.parseInt(route.params.date as string ?? "") as number;

if (!Number.isInteger(date)) {
  navigateTo(route.redirectedFrom ?? "/dashboard");
  toast.error("Date Param is not correct");
}

pending.value = true;
try {
  const fetched_dated_withdraws = await $fetch(`/api/withdraw/date/${date}`);

  withdrawStore.set_dated_withdraws(fetched_dated_withdraws);
}
catch (error) {
  console.error(error);
}
finally {
  pending.value = false;
}
</script>

<template>
  <div class="p-4">
    <UiButton class="mb-4" @click="navigateTo('/withdraw')">
      <LucideChevronLeft />
      Back to Withdraws
    </UiButton>
    <div v-if="pending" class="flex items-center justify-center min-h-[50vh]">
      <Loader2 class="animate-spin" />
    </div>
    <div v-else>
      <h3 class="text-lg font-semibold mb-2 flex items-center justify-between">
        Logged Withdraws for {{ new Date(date).toLocaleDateString() }}
        <div v-if="withdraws" class="rounded-full bg-accent px-3 pb-0.5 pt-1">
          {{ withdraws.length }}
        </div>
      </h3>
      <div class="space-y-2 mb-10">
        <div v-if="withdraws && withdraws.length > 0" class="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
          <AppWithdrawCard v-for="withdraw in withdraws" :key="withdraw.id" :withdraw="withdraw" :dated-withdraw="true" />
        </div>
        <div v-else class="dark:text-gray-400 text-[#8B5C2A]/70">
          No withdraws logged at {{ new Date(date).toLocaleDateString() }}.
        </div>
      </div>
    </div>
  </div>
</template>
