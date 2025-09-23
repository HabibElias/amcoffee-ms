<script setup lang="ts">
import { AlertCircle, Home } from "lucide-vue-next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const route = useRoute();
const error = route.query.error || "An unknown error occorred";
</script>

<template>
  <div class="min-h-[70vh]">
    <Alert variant="default">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Oh no! {{ error }}
        <NuxtLink to="/">
          <UiButton variant="outline" class="mt-20 text-black dark:text-white">
            <Home />
            Go Back Home
          </UiButton>
        </NuxtLink>
      </AlertDescription>
    </Alert>
  </div>
</template>
