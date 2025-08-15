<template>
  <div class="container mx-auto font-[Josefin_Sans] text-[#8B5C2A] dark:text-white p-4">
    <AppHeader />
    <div>
      <slot />
    </div>
    <footer class="mt-10 py-6 border-t text-center  text-sm">
      &copy; {{ new Date().getFullYear() }} Anno Macchiato Coffee Shop &mdash; Built by @habib_elias
    </footer>
  </div>
</template>
