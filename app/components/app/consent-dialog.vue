<script lang="ts" setup>
import { Trash2 } from "lucide-vue-next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const props = defineProps<{
  title: string;
  description: string;
  action: () => Promise<void>;
}>();
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <UiButton
        variant="outline" size="icon"
        class="btn-dark"
      >
        <Trash2 />
      </UiButton>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] font-[poppins]">
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription>
          {{ props.description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <UiDialogClose>
          <UiButton variant="outline">
            Cancel
          </UiButton>
        </UiDialogClose>
        <UiButton
          @click="action"
        >
          Continue
        </UiButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
