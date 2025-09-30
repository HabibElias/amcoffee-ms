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
  <div class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xs p-6 mb-6 border border-gray-200 dark:border-[#222]">
    <div class="flex items-center justify-between mb-4">
      <div>
        <span class="font-semibold text-base text-primary">
          {{ props.withdraw.user?.name }}<br>
          <span class="text-xs text-gray-500 dark:text-gray-300">{{ props.withdraw.user?.email }}</span>
        </span>
      </div>
      <span class="bg-accent-foreground text-accent text-xs px-3 py-1 rounded-full">
        #{{ props.withdraw.id }}
      </span>
    </div>
    <div class="flex py-5 items-center justify-between gap-4 text-bg font-semibold text-red-500 dark:text-red-300 mb-2">
      <span class="text-4xl">-${{ props.withdraw.amount }}</span>
    </div>
    <div>
      <div>Description</div>
      <span>{{ props.withdraw.description }}</span>
    </div>
    <!-- btns -->
    <div class="w-full flex items-center justify-end gap-3">
      <AppConsentDialog
        title="Delete Withdraw"
        description="Are you sure you want to delete this withdraw log"
        :action="() => datedWithdraw ? withdrawStore.handleDeleteDatedWithdraw(props.withdraw.id) : withdrawStore.handleDeleteWithdraw(props.withdraw.id)"
      />
      <AppEditWithdrawDialog :id="props.withdraw.id" :dated-withdraw="datedWithdraw" />
    </div>
  </div>
</template>
