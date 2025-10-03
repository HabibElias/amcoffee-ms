<script setup lang="ts">
import type { Withdraw } from "~~/lib/db/schema";
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { InsertWithdrawSchema } from "~~/lib/db/schema";
import { BanknoteArrowDown, Loader2, Pen } from "lucide-vue-next";
import { useForm } from "vee-validate";

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
import { Input } from "@/components/ui/input";

const props = defineProps<{
  id: number;
  datedWithdraw?: boolean;
}>();

const withdrawStore = useWithdrawStore();
const loading = ref<boolean>(false);
const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(InsertWithdrawSchema),
  initialValues: {
    amount: 0,
    description: "",
  },
});

async function checkWithdraw() {
  loading.value = true;
  const withdraw = ref<Withdraw>();
  if (props.datedWithdraw) {
    withdraw.value = withdrawStore.get_dated_withdraws.value.find(item => item.id === props.id) ?? {} as Withdraw;
  }
  else {
    withdraw.value = withdrawStore.get_today_withdraws.value.find(item => item.id === props.id) ?? {} as Withdraw;
  }
  setValues({
    amount: withdraw.value.amount,
    description: withdraw.value.description,
  });
  loading.value = false;
}

const submitError = ref<string>("");
const open = ref<boolean>();

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = "";
    open.value = false;

    withdrawStore.handleUpdateWithdraw(props.id, values, props.datedWithdraw);
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      submitError.value = error.data?.data;
    }
    submitError.value = error.statusMessage ?? "unknown error occurred";
  }
  loading.value = false;
});
</script>

<template>
  <Dialog :open="open">
    <DialogTrigger as-child>
      <UiButton
        variant="outline" size="icon"
        class="btn-dark"
        @click="checkWithdraw"
      >
        <Pen />
      </UiButton>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] font-[poppins]">
      <UiAlert v-if="submitError" variant="destructive" class="border-destructive">
        <UiAlertTitle>Error</UiAlertTitle>
        <UiAlertDescription>{{ submitError }}</UiAlertDescription>
      </UiAlert>
      <form @submit.prevent="onSubmit">
        <DialogHeader>
          <DialogTitle>Withdraw</DialogTitle>
          <DialogDescription>
            add a withdraw log here with a description
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="amount">
            <FormItem class="w-full">
              <FormLabel for="amount">
                Amount *
              </FormLabel>
              <FormControl>
                <Input id="amount" :disabled="loading" v-bind="componentField" placeholder="150" type="number" class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem class="w-full">
              <FormLabel for="description">
                Description *
              </FormLabel>
              <FormControl>
                <Input id="description" :disabled="loading" v-bind="componentField" placeholder="something..." class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            :disabled="loading"
          >
            <BanknoteArrowDown v-if="!loading" />
            <Loader2 v-else class="animate-spin" />
            Log Withdraw
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
