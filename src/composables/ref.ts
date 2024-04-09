import { customRef } from "vue";

export function useInputVisibleRef(value: any) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (!newValue) {
          value = newValue;
          trigger();
        }
        else {
          setTimeout(() => {
            value = newValue;
            trigger();
          }, import.meta.env.GAP);
        }
      },
    };
  });
}
