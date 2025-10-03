import type { FetchError } from "ofetch";

import { Save } from "lucide-vue-next";
import { toast } from "vue-sonner";

export type Withdraw = {
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

export const useWithdrawStore = defineStore("withdrawStore", () => {
  const today_withdraws = ref<Withdraw[]>([]);
  const dated_withdraws = ref<Withdraw[]>([]);

  const set_today_withdraws = (withdraws: Withdraw[]) => {
    today_withdraws.value = withdraws;
  };

  const get_today_withdraws = computed(() => today_withdraws);

  const set_dated_withdraws = (withdraws: Withdraw[]) => {
    dated_withdraws.value = withdraws;
  };

  const get_dated_withdraws = computed(() => dated_withdraws);

  async function handleAddWithdraw(withdrawItems: { amount: number; description: string }) {
    try {
      toast.promise(
        (async () => {
          const inserted = await $fetch("/api/withdraw", {
            method: "post",
            body: withdrawItems,
          });
          // Add the new Withdraw only after successful response
          today_withdraws.value = [inserted, ...today_withdraws.value];
          return inserted;
        })(),
        {
          loading: "Logging Withdraw...",
          success: () => "Withdraw items have been logged",
          error: () => "Error logging Withdraw",
        },
      );
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
      toast.error("Failed to log Withdraw");
    }
  }

  async function handleUpdateWithdraw(id: number, values: { amount: number; description: string }, dated_withdraw: boolean) {
    toast.promise(
      (async () => {
        const updated_withdraw = await $fetch(`/api/withdraw/${id}`, {
          method: "patch",
          body: values,
        });

        if (dated_withdraw) {
          set_dated_withdraws(dated_withdraws.value.map(withdraw => withdraw.id === id ? updated_withdraw : withdraw));
        }
        else {
          set_today_withdraws(today_withdraws.value.map(withdraw => withdraw.id === id ? updated_withdraw : withdraw));
        }
      })(),
      {
        loading: "Loading...",
        success: () => `Withdraw Log are up to date`,
        error: () => "Error",
        icon: Save,
      },
    );
  }

  async function handleDeleteWithdraw(id: number) {
    const prevWithdraws = [...today_withdraws.value];
    today_withdraws.value = today_withdraws.value.filter(Withdraw => Withdraw.id !== id);

    try {
      toast.promise(
        await $fetch(`/api/withdraw/${id}`, { method: "DELETE" }),
        {
          loading: "Deleting log...",
          success: () => "Withdraw log has been deleted",
          error: (err: FetchError) => err.statusText,
        },
      );
    }

    catch (err: unknown) {
      // Revert state if deletion fails
      today_withdraws.value = prevWithdraws;
      // Type guard to check if err is a FetchError
      if (err && typeof err === "object" && "statusText" in err) {
        toast.error((err as FetchError).statusText ?? "Unknown error");
      }
      else {
        toast.error("Unknown error");
      }
    }
  }

  async function handleDeleteDatedWithdraw(id: number) {
    const prevWithdraws = [...dated_withdraws.value];
    set_dated_withdraws(dated_withdraws.value.filter(Withdraw => Withdraw.id !== id));

    try {
      toast.promise(
        await $fetch(`/api/withdraw/${id}`, { method: "DELETE" }),
        {
          loading: "Deleting log...",
          success: () => "Withdraw log has been deleted",
          error: (err: FetchError) => err.statusText,
        },
      );
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
      // Revert state if deletion fails
      dated_withdraws.value = prevWithdraws;
      toast.error("Failed to delete Withdraw");
    }
  }

  return {
    today_withdraws,
    dated_withdraws,
    set_today_withdraws,
    get_today_withdraws,
    set_dated_withdraws,
    get_dated_withdraws,
    handleDeleteWithdraw,
    handleAddWithdraw,
    handleDeleteDatedWithdraw,
    handleUpdateWithdraw,
  };
});
