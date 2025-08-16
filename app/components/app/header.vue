<template>
  <header class="flex items-center justify-between">
    <!-- logo -->
    <NuxtLink to="/">
      <img
        class="w-20 dark:invert dark:brightness-0"
        src="../../assets/images/logo.png"
      >
    </NuxtLink>

    <AppToggleColor />

    <nav>
      <UiButton class="bg-[#8B5C2A]">
        SignIn <Icon name="ri:login-box-fill" size="18" />
      </UiButton>
    </nav>
  </header>
</template>
