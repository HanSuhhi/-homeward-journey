import { ref } from "vue";
import { setConsoleMatter } from "./matters";
import { setPlaceMessage } from "@/components/terminals/contents/messages/message";
import type { Places } from "@/i18n/packages/place";

export const place = ref<Places>();

export async function togglePlace(to: Places) {
  if (place.value !== to) {
    setConsoleMatter();
    place.value = to;
    await setPlaceMessage(to);
  }
}
