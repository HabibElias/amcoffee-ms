import type { Menu } from "@@/lib/db/schema/menu";

import { toast } from "vue-sonner";

export const useMenuStore = defineStore("menuItemStore", () => {
  const menuItems = ref<Menu[]>();
  const pending = ref<boolean>(false);
  async function init() {
    try {
      pending.value = true;
      const data = await $fetch<Menu[]>("/api/menu");
      pending.value = false;
      menuItems.value = data ?? [];
    }
    catch (e) {
      toast.error(`Failed to fetch menu items, ${e}`);
    }
  }

  const getMenuItems = () => menuItems;
  const setMenuItems = (items: Menu[]) => {
    menuItems.value = [...items];
  };

  const refreshMenuItems = async () => {
    // eslint-disable-next-line no-console
    console.log("refreshing");

    await init();
  };

  async function handleDeleteMenuItem(id: number) {
    toast.promise(
      (async () => {
        const deleted = await $fetch(`/api/menu/${id}`, {
          method: "DELETE",
        });
        // eslint-disable-next-line no-console
        console.log(deleted);
        if (menuItems.value) {
          setMenuItems(menuItems.value.filter(item => item.id !== id));
        }
        return deleted;
      })(),
      {
        loading: "Loading...",
        success: () => `menu item has been deleted`,
        error: () => "Error, something went wrong",
      },
    );
  }
  return {
    pending,
    init,
    getMenuItems,
    setMenuItems,
    refreshMenuItems,
    handleDeleteMenuItem,
  };
});
