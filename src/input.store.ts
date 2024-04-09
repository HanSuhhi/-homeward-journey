import { nextTick, ref, watch } from "vue";
import { globalMatters } from "./core/matter";
import { useInputVisibleRef } from "./composables/ref";

export const inputRef = ref<HTMLInputElement | null>(null);
export const inputValue = ref("");
export const inputVisible = useInputVisibleRef(false);

export function initInput() {
  window.onfocus = function () {
    inputRef.value?.focus();
  };
  window.onclick = function () {
    inputRef.value?.focus();
  };

  watch(inputVisible, (IsVisable) => {
    if (IsVisable) {
      const lastMessage = globalMatters[globalMatters.length - 1];
      const index = Reflect.get(lastMessage, "id");
      const currentElement = document.getElementById(`text-${index}`);
      currentElement?.classList.add("message-matter-end");
      inputValue.value = "";
      nextTick(() => inputRef.value?.focus());
    }
  });
}
