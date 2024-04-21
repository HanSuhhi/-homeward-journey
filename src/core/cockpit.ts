import { defineStore } from "pinia";
import { useInputCheck } from "@/composables/cockpit";

const useCockpitStore = defineStore("cockpit", () => {
  const { commands } = useInputCheck();

  return { commands };
});
export { useCockpitStore };
