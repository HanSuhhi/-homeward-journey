import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { usePickerStore } from "@/core/picker";

export function usePickerIndex() {
  const { total } = storeToRefs(usePickerStore());
  const pickerIndex = ref(0);

  onMounted(() => {
    pickerIndex.value = total.value++;
  });

  return { pickerIndex };
}
