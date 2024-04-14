import { computed, nextTick, ref, watch } from "vue";
import { useInputVisibleRef } from "./composables/ref";
import { globalMatters } from "./core/matter";
import { questionMark } from "./i18n/vars";

export const inputRef = ref<HTMLInputElement | null>(null);
export const inputValue = ref("");
export const inputDisabled = ref(false);
export const inputVisible = useInputVisibleRef(false);

export const enterQuestionMark = computed(() => inputValue.value.endsWith(questionMark));
export const inputValueSplits = computed(() => inputValue.value.trim().split(/\s+/));

export function initInput() {
  window.onfocus = function () {
    inputRef.value?.focus();
  };
  window.onclick = function () {
    inputRef.value?.focus();
  };

  watch(inputVisible, (IsVisable) => {
    if (!IsVisable) return;
    const lastMessage = globalMatters[globalMatters.length - 1];
    const index = Reflect.get(lastMessage, "id");
    const currentElement = document.getElementById(`text-${index}`);
    currentElement?.classList.add("message-matter-end");
    inputValue.value = "";
    nextTick(() => inputRef.value?.focus());
  });
}
