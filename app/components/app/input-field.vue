<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const props = defineProps<{
  label: string;
  name: string;
}>();
</script>

<template>
  <FormField name="{{ props.name }}">
    <FormItem class="w-full">
      <FormLabel>{{ props.label }}</FormLabel>
      <FormControl>
        <slot />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
