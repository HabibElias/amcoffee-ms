<script setup lang="ts">
import { CalendarIcon } from "lucide-vue-next";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const authStore = useAuthStore();
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Avatar class="cursor-pointer">
        <AvatarImage :src="authStore.user?.image ?? ''" class="object-cover" alt="user_avatar_img" />
        <AvatarFallback>{{ authStore.user?.name.slice(0, 1).toUpperCase() }}</AvatarFallback>
      </Avatar>
    </HoverCardTrigger>
    <HoverCardContent class="w-80 font-[poppins]">
      <div class="flex items-center space-x-4">
        <Avatar>
          <AvatarImage :src="authStore.user?.image ?? ''" class="object-cover" alt="user_avatar_img" />
          <AvatarFallback>{{ authStore.user?.name.slice(0, 1).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="flex-1 space-y-1">
          <h4 class="text-sm font-semibold">
            {{ authStore.user?.name || 'User' }}
          </h4>
          <p class="text-xs text-muted-foreground">
            {{ authStore.user?.email || '' }}
          </p>
          <div v-if="authStore.user?.createdAt" class="flex items-center pt-2">
            <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
            <span class="text-xs text-muted-foreground">
              Joined {{ new Date(authStore.user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) }}
            </span>
          </div>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <NuxtLink
          to="/sign-out"
        >
          <UiButton variant="destructive">
            <Icon name="ri:logout-box-line" size="18" />
            Logout
          </UiButton>
        </NuxtLink>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
