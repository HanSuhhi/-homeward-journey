import type { Ref } from "vue";
import { ref, watch } from "vue";

import { defineStore } from "pinia";

function usePickerEvent(activeIndex: Ref<number>) {
  // const pickerEvent = ref<((index: number) => any) | null>(null);
  const pickerEvents: Array<(num: number) => any> = [];
  const setPickerEvent = (func: (num: number) => any) => pickerEvents.push(func);

  const runPickerEvent = async () => {
    for (const event of pickerEvents) await event(activeIndex.value);
    pickerEvents.length = 0;
  };

  return {
    setPickerEvent,
    runPickerEvent,
  };
}

const usePickerStore = defineStore("picker-store", () => {
  const total = ref(0);
  const activePickerIndex = ref(0);
  const { setPickerEvent, runPickerEvent } = usePickerEvent(activePickerIndex);

  // watchIfIndexIsReset
  watch(
    () => !total.value,
    () => {
      activePickerIndex.value = 0;
    },
  );

  return {
    total,
    setPickerEvent,
    runPickerEvent,
    activePickerIndex,
  };
});

export {
  usePickerStore,
};
