import type { Ref } from "vue";
import { ref, watch } from "vue";

export function usePickerDeg(model: Ref<number>) {
  const deg = ref("135deg");

  const updateDeg = () => {
    deg.value = `${Math.floor(Math.random() * (245 - 135 + 1)) + 135}deg`;
  };

  watch(model, updateDeg);

  return {
    deg,
  };
}
