import type { FetchError } from "ofetch";

import { Save } from "lucide-vue-next";
import { toast } from "vue-sonner";

export type Order = {
  id: number;
  userId: number;
  orderDate: number;
  user: {
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: number;
    updatedAt: number;
  } | null;
  orderItem: {
    id: number;
    createdAt: number;
    updatedAt: number;
    orderId: number;
    menuId: number;
    quantity: number;
  }[];
};

export const useOrderStore = defineStore("ordersStore", () => {
  const today_orders = ref<Order[]>([]);
  const dated_orders = ref<Order[]>([]);

  const set_today_orders = (orders: Order[]) => {
    today_orders.value = orders;
  };

  const get_today_orders = computed(() => today_orders);

  const set_dated_orders = (orders: Order[]) => {
    dated_orders.value = orders;
  };

  const get_dated_orders = computed(() => dated_orders);

  async function handleAddOrder(orderItems: { quantity: number; menuId: string }[]) {
    try {
      toast.promise(
        (async () => {
          const inserted = await $fetch("/api/orders", {
            method: "post",
            body: { orderItems },
          });
          // Add the new order only after successful response
          today_orders.value = [inserted, ...today_orders.value];
          return inserted;
        })(),
        {
          loading: "Adding order...",
          success: () => "Order items have been added",
          error: () => "Error adding order",
        },
      );
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
      toast.error("Failed to add order");
    }
  }

  async function handleDeleteOrder(id: number) {
    const prevOrders = [...today_orders.value];
    today_orders.value = today_orders.value.filter(order => order.id !== id);

    try {
      toast.promise(
        await $fetch(`/api/orders/${id}`, { method: "DELETE" },
        ),
        {
          loading: "Deleting...",
          success: () => "Order has been deleted",
          error: (err: FetchError) => err.statusText,
        },
      );
    }

    catch (err: unknown) {
      // Revert state if deletion fails
      today_orders.value = prevOrders;
      // Type guard to check if err is a FetchError
      if (err && typeof err === "object" && "statusText" in err) {
        toast.error((err as FetchError).statusText ?? "Unknown error");
      }
      else {
        toast.error("Unknown error");
      }
    }
  }

  async function handleDeleteDatedOrder(id: number) {
    const prevOrders = [...dated_orders.value];
    dated_orders.value = dated_orders.value.filter(order => order.id !== id);

    try {
      toast.promise(
        await $fetch(`/api/orders/${id}`, { method: "DELETE" }),
        {
          loading: "Deleting...",
          success: () => "Order has been deleted",
          error: (err: FetchError) => err.statusText,
        },
      );
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
      // Revert state if deletion fails
      dated_orders.value = prevOrders;
      toast.error("Failed to delete order");
    }
  }

  async function handleUpdateOrder(id: number, orderItems: { quantity: number; menuId: string }[], datedOrder: boolean) {
    toast.promise(
      (async () => {
        const inserted = await $fetch(`/api/orders/${id}`, {
          method: "patch",
          body: {
            orderItems,
          },
        });
        if (datedOrder) {
          set_dated_orders(dated_orders.value.map(withdraw => withdraw.id === id ? inserted : withdraw));
        }
        else {
          set_today_orders(today_orders.value.map(withdraw => withdraw.id === id ? inserted : withdraw));
        }
      })(),
      {
        loading: "Loading...",
        success: () => `Order items are up to date`,
        error: () => "Error",
        icon: Save,
      },
    );
  }

  return {
    todays_order: today_orders,
    dated_orders,
    set_today_orders,
    get_today_orders,
    set_dated_orders,
    get_dated_orders,
    handleDeleteOrder,
    handleAddOrder,
    handleDeleteDatedOrder,
    handleUpdateOrder,
  };
});
