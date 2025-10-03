<script setup lang="ts">
const props = defineProps<{
  withdraw: {
    id: number;
    createdAt: number;
    updatedAt: number;
    description: string;
    userId: number;
    amount: number;
    user: {
      id: number;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string | null;
      createdAt: number;
      updatedAt: number;
    } | null;
  };
  datedWithdraw?: boolean;
}>();

const withdrawStore = useWithdrawStore();
</script>

<template>
  <Motion
    class="bg-white dark:bg-[#141414] rounded-lg shadow-xs border-1 hover:shadow-sm duration-200 p-6 flex flex-1 flex-col mb-6"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
  >
    <div class="flex flex-col items-start mb-2">
      <div class="flex items-center gap-3 mb-3">
        <div>
          <h3 class="text-lg font-semibold">
            {{ props.withdraw.user?.name || 'Unknown User' }}
          </h3>
          <div class="text-xs text-gray-500 dark:text-gray-400">
            {{ props.withdraw.user?.email }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-2">
        <span class="text-primary font-bold text-xl">-${{ props.withdraw.amount }}</span>
        <span class="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-mono tracking-wider">#{{ props.withdraw.id }}</span>
      </div>
      <div class="text-xs text-gray-400 dark:text-gray-500 mb-1">
        {{ new Date(props.withdraw.createdAt).toLocaleDateString() }}
      </div>
    </div>
    <div class="mb-3 px-2 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
        Description
      </div>
      <span class="text-sm text-gray-700 dark:text-gray-200">{{ props.withdraw.description }}</span>
    </div>
    <div class="w-full flex items-center justify-end gap-3 mt-2">
      <AppConsentDialog
        title="Delete Withdraw"
        description="Are you sure you want to delete this withdraw log?"
        :action="() => datedWithdraw ? withdrawStore.handleDeleteDatedWithdraw(props.withdraw.id) : withdrawStore.handleDeleteWithdraw(props.withdraw.id)"
      />
      <AppEditWithdrawDialog :id="props.withdraw.id" :dated-withdraw="datedWithdraw" />
    </div>
  </Motion>
</template>
