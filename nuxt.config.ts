import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "motion-v/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./app/components/ui"
     */
    componentDir: "./components/ui",
  },
  // alias: {
  //   "@": ".",
  //   "~": ".",
  //   "images": fileURLToPath(new URL("./app/assets/images", import.meta.url)),
  //   "style": fileURLToPath(new URL("./app/assets/style", import.meta.url)),
  //   "data": fileURLToPath(new URL("./app/assets/other/data", import.meta.url)),
  // },
});
