import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useInputVisibleRef } from "./composables/ref";
import { InputState, inputState } from "./core/inputState";
import { globalMatters } from "./core/matter";
import { usePickerStore } from "./core/picker";
import { questionMark } from "./i18n/vars";

export const inputRef = ref<HTMLInputElement | null>(null);
export const inputValue = ref("");
export const inputDisabled = ref(false);
export const inputVisible = useInputVisibleRef(false);

export const enterQuestionMark = computed(() => inputValue.value.endsWith(questionMark));
export const inputValueSplits = computed(() => inputValue.value.trim().split(/\s+/));
export function focusInput() {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
}

function focus() {
  switch (inputState.value) {
    case InputState.Input: return focusInput();
    case InputState.Picker: {
      const { activePickerIndex } = storeToRefs(usePickerStore());
      const radios = document.querySelectorAll<HTMLInputElement>("input[type=\"radio\"]");
      radios[activePickerIndex.value].focus();
      break;
    }
    default:
      break;
  }
}

export function initInput() {
  window.onfocus = window.onclick = focus;

  watch(inputVisible, (IsVisable) => {
    if (!IsVisable) return;
    const lastMessage = globalMatters[globalMatters.length - 1];
    const index = Reflect.get(lastMessage, "id");
    const currentElement = document.getElementById(`text-${index}`);
    currentElement?.classList.add("message-matter-end");
    inputValue.value = "";
    focusInput();
  });
}
