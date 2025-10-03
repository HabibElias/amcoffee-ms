<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { ClipboardListIcon, ListRestart, Loader2, Pen, PlusIcon, Save, Trash2 } from "lucide-vue-next";
import { useForm } from "vee-validate";
import z from "zod";

import type { Order } from "@/stores/order";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const props = defineProps<{
  id: number;
  datedOrder?: boolean;
}>();

const menuItems = useMenuStore().getMenuItems();
const orderStore = useOrderStore();

const loading = ref<boolean>(false);
const orderItems = ref<{ quantity: number; menuId: string }[]>([]);
const submitError = ref<string>("");
const open = ref<boolean>();

const orderValidationSchema = toTypedSchema(z.object({
  quantity: z.number({ message: "Field required" }).min(1, { message: "Minimum number 1" }),
  menuId: z.string({ message: "Field required" }).min(1, { message: "Field required" }),
}));

async function checkOrder() {
  loading.value = true;
  const order = ref<Order>({} as Order);
  if (props.datedOrder) {
    order.value = orderStore.get_dated_orders.value.find(item => item.id === props.id) ?? {} as Order;
  }
  else {
    order.value = orderStore.get_today_orders.value.find(item => item.id === props.id) ?? {} as Order;
  }
  loading.value = false;
  orderItems.value = (order.value.orderItem ?? []).map(item => ({
    quantity: item.quantity,
    menuId: item.menuId.toString(),
  }));
}

const { handleSubmit, resetForm } = useForm({ validationSchema: orderValidationSchema });

const onSubmit = handleSubmit((values) => {
  if (orderItems.value.find(item => item.menuId === values.menuId)) {
    const beforeOrder = orderItems.value.find(item => item.menuId === values.menuId);
    orderItems.value = orderItems.value.map(item => item.menuId === beforeOrder?.menuId ? { ...beforeOrder, quantity: beforeOrder.quantity + values.quantity } : item);
  }
  else {
    orderItems.value.push(values);
  }
  resetForm();
});

function resetOrder() {
  orderItems.value = [];
}
function deleteOrder(id: string) {
  orderItems.value = orderItems.value.filter(item => item.menuId !== id);
}

async function onAddSubmit() {
  if (orderItems.value.length <= 0) {
    submitError.value = "Please add order items";
    return;
  }
  try {
    loading.value = true;
    submitError.value = "";
    open.value = false;

    orderStore.handleUpdateOrder(props.id, orderItems.value, props.datedOrder);

    resetForm();
    resetOrder();
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      submitError.value = error.data?.data;
    }
    submitError.value = error.statusMessage ?? "unknown error occurred";
  }
  loading.value = false;
}
</script>

<template>
  <Dialog class="font-[poppins]">
    <DialogTrigger as-child>
      <UiButton
        variant="outline" size="icon"
        class="btn-dark"
        @click.prevent="checkOrder"
      >
        <Pen />
      </UiButton>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] font-[poppins] font-light">
      <UiAlert v-if="submitError" variant="destructive" class="w-full">
        <UiAlertDescription>
          {{ submitError }}
        </UiAlertDescription>
      </UiAlert>
      <DialogHeader>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogDescription>
          Edit the order by adding an item or removing the existing ones.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="flex items-start gap-2 py-4">
          <FormField v-slot="{ componentField }" name="menuId">
            <FormItem class="w-full">
              <FormLabel for="menuId">
                Menu Item *
              </FormLabel>
              <UiSelect id="menuId" :disabled="loading" v-bind="componentField">
                <FormControl>
                  <UiSelectTrigger class="w-[180px]">
                    <UiSelectValue placeholder="Select a menu item" />
                  </UiSelectTrigger>
                </FormControl>
                <UiSelectContent class="font-[poppins]">
                  <UiSelectGroup>
                    <UiSelectLabel class="font-bold text-black/30 dark:text-white/50">
                      Food
                    </UiSelectLabel>
                    <UiSelectItem v-for="item in menuItems?.filter(item => item.type === 'food')" :key="item.id" class="text-sm " :value="item.id.toString()">
                      {{ item.name }}
                    </UiSelectItem>
                    <div
                      v-if="menuItems?.filter(item => item.type === 'food') && 0 >= menuItems?.filter(item => item.type === 'food').length"
                      class="ml-3"
                    >
                      No food menu item
                    </div>
                  </UiSelectGroup>
                  <UiSelectGroup>
                    <UiSelectLabel class="font-bold text-black/50 dark:text-white/50">
                      Drink
                    </UiSelectLabel>
                    <UiSelectItem v-for="item in menuItems?.filter(item => item.type === 'drink')" :key="item.id" class="text-sm " :value="item.id.toString()">
                      {{ item.name }}
                    </UiSelectItem>
                    <div
                      v-if="menuItems?.filter(item => item.type === 'drink') && 0 >= menuItems?.filter(item => item.type === 'drink').length"
                      class="ml-3"
                    >
                      No drink menu item
                    </div>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="quantity">
            <FormItem class="w-full">
              <FormLabel for="quantity">
                Quantity *
              </FormLabel>
              <FormControl>
                <UiInput id="quantity" :disabled="loading" v-bind="componentField" placeholder="1" type="number" class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button
          type="submit"
          class="self-center"
        >
          <PlusIcon />
          order
        </Button>
      </form>
      <div class="flex items-center justify-between">
        Order review
        <Button size="icon" @click="resetOrder">
          <ListRestart />
        </Button>
      </div>
      <div v-if="orderItems && orderItems.length > 0">
        <div class="flex items-center *:w-full text-xs text-gray-400 dark:text-gray-200 mb-3 justify-between font-semibold">
          <span class="text-start">Name</span>
          <span class="text-end">Quantity</span>
          <span class="text-end">Total Price</span>
        </div>
        <div v-for="item in orderItems" :key="item.menuId" class="flex items-center justify-between mb-3">
          <span class="flex items-center gap-2">
            <UiButton class="size-7" variant="destructive" size="icon" @click="deleteOrder(item.menuId)">
              <Trash2 :size="3" />
            </Uibutton>

            {{ menuItems?.find(menuItem => Number(item.menuId) === menuItem.id)?.name || "No Item found" }}
          </span>
          <span>
            {{ item.quantity }}
          </span>
          <span>
            {{
              (() => {
                const menuItem = menuItems?.find(menuItem => Number(item.menuId) === menuItem.id);
                return menuItem ? (menuItem.price * item.quantity).toLocaleString() : "-";
              })()
            }}
          </span>
        </div>
        <div class="flex justify-end mt-4">
          <span class="text-sm font-bold">
            Total:&nbsp;
            {{
              orderItems.reduce((sum, item) => {
                const menuItem = menuItems?.find(menuItem => Number(item.menuId) === menuItem.id);
                return sum + (menuItem ? menuItem.price * item.quantity : 0);
              }, 0).toLocaleString()
            }}
          </span>
        </div>
      </div>
      <div v-else-if="loading && orderItems.length <= 0" class="flex items-center justify-center">
        <Loader2 class="animate-spin" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-200">
        <ClipboardListIcon />
        <span class="text-sm">No orders yet</span>
      </div>
      <DialogFooter>
        <Button @click.prevent="onAddSubmit">
          <Save />
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
