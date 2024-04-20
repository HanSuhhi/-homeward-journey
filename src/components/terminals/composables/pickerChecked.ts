import { storeToRefs } from "pinia";
import { type Ref, onMounted, watch } from "vue";
import { usePickerStore } from "@/core/picker";

export function usePickerChecked(radio: Ref<HTMLInputElement | undefined>, index: Ref<number>) {
  const { activePickerIndex } = storeToRefs(usePickerStore());

  function updateChecked() {
    if (!radio.value) return;
    if (activePickerIndex.value === index.value) {
      radio.value.focus();
      radio.value.checked = true;
    }
  }
  watch(activePickerIndex, updateChecked);
  onMounted(updateChecked);
}
