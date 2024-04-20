import { whenever } from "@vueuse/core";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { usePickerStore } from "./picker";
import { inputVisible } from "@/input.store";

export enum InputState {
  Input,
  Picker,
}

export const inputState = ref<InputState>(InputState.Input);

function useInputState() {
  const inInputState = computed(() => inputState.value === InputState.Input);
  const notInputState = computed(() => inputState.value !== InputState.Input);

  return { inInputState, notInputState };
}

function usePickerState() {
  const inPickerState = computed(() => inputState.value === InputState.Picker);
  const notPickerState = computed(() => inputState.value !== InputState.Picker);

  whenever(inPickerState, () => {
    // lock input
    inputVisible.value = false;
    // reset picker index
    const { total } = storeToRefs(usePickerStore());
    total.value = 0;
  });
  whenever(notPickerState, () => {
    inputVisible.value = true;
  });
  return { inPickerState };
}

export const { inPickerState } = usePickerState();
export const { inInputState, notInputState } = useInputState();
