<script lang="ts" setup>
import type { Menu } from "~~/lib/db/schema";
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { InsertMenuSchema } from "~~/lib/db/schema";
import { File, Loader2, Pen } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const props = defineProps<{
  id: number;
}>();

const menuStore = useMenuStore();
const menuItem = ref<Menu | undefined>();

const submitError = ref<string>("");
const open = ref<boolean>(); // default to true
const loading = ref<boolean>(false);

const { handleSubmit, setErrors, setValues } = useForm({
  validationSchema: toTypedSchema(InsertMenuSchema),
  initialValues: {
    name: "",
    price: 0,
    image: "",
  },
});

function checkMenuItem() {
  const found = menuStore.getMenuItems().value?.find(item => item.id === props.id);

  if (!found) {
    open.value = false;
    return;
  }
  menuItem.value = found;
  setValues({
    name: found.name,
    price: found.price,
    image: found.image,
    type: found.type,
  });
}

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    submitError.value = "";
    open.value = false;

    await toast.promise(
      (async () => {
        const inserted = await $fetch(`/api/menu/${props.id}`, {
          method: "PATCH",
          body: values,
        });
        // eslint-disable-next-line no-console
        console.log(inserted);
        return inserted;
      })(),
      {
        loading: "Loading...",
        success: () => `menu item has been updated`,
        error: () => "Error, Something went wrong",
      },
    );
    menuStore.refreshMenuItems();
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage ?? "unknown error occured";
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
        @click="checkMenuItem"
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
          <DialogTitle>Edit a Menu Item</DialogTitle>
          <DialogDescription>
            Edit the details and click the Save button.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="w-full">
              <FormLabel for="name">
                Name *
              </FormLabel>
              <FormControl>
                <Input id="name" :disabled="loading" v-bind="componentField" placeholder="Lemon Juice" class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="price">
            <FormItem class="w-full">
              <FormLabel for="price">
                Price *
              </FormLabel>
              <FormControl>
                <Input id="price" :disabled="loading" v-bind="componentField" placeholder="20" type="number" class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="image">
            <FormItem class="w-full">
              <FormLabel for="image">
                Image
              </FormLabel>
              <FormControl>
                <Input id="image" :disabled="loading" v-bind="componentField" placeholder="https://www.example.com/" type="url" class="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="type">
            <FormItem class="w-full">
              <FormLabel for="types">
                Type *
              </FormLabel>
              <Select id="types" :disabled="loading" v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    <SelectItem value="food">
                      Food
                    </SelectItem>
                    <SelectItem value="drink">
                      Drink
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            :disabled="loading"
          >
            <File v-if="!loading" />
            <Loader2 v-else class="animate-spin" />
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
