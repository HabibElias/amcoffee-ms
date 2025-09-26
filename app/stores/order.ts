import type { FetchError } from "ofetch";

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

export const useOrderStore = defineStore("OrdersStore", () => {
  const todays_order = ref<Order[]>([]);
  const dated_orders = ref<Order[]>([]);

  const set_today_orders = (orders: Order[]) => {
    todays_order.value = orders;
  };

  const get_today_orders = computed(() => todays_order);

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
          todays_order.value = [inserted, ...todays_order.value];
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
    const prevOrders = [...todays_order.value];
    todays_order.value = todays_order.value.filter(order => order.id !== id);

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

    catch (err: unknown) {
      // Revert state if deletion fails
      todays_order.value = prevOrders;
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

  return {
    todays_order,
    dated_orders,
    set_today_orders,
    get_today_orders,
    set_dated_orders,
    get_dated_orders,
    handleDeleteOrder,
    handleAddOrder,
    handleDeleteDatedOrder,
  };
});
