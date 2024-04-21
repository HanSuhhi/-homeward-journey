import { useStorage } from "@vueuse/core";
import { inputValue } from "@/input.store";

export function useInputHistory() {
  const inputHistory = useStorage<string[]>("history", []);

  function setInputHistory() {
    if (inputHistory.value[inputHistory.value.length - 1] === inputValue.value) return;
    if (!inputValue.value) return;
    inputHistory.value.push(inputValue.value);
  }

  return {
    inputHistory,
    setInputHistory,
  };
}
