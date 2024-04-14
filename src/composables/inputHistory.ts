import { useStorage } from "@vueuse/core";
import { inputRef, inputValue } from "@/input.store";

const key = "history";

const inputHistory = useStorage<string[]>(key, []);

let index = 0;
window.onkeydown = (e) => {
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      if (inputHistory.value.length <= index) return index;

      index++;
      inputRef.value?.blur();
      inputValue.value = inputHistory.value[inputHistory.value.length - index];
      setTimeout(() => {
        inputRef.value?.focus();
      }, 0);
      break;
    case "ArrowDown":
      if (!index) return;
      index--;
      inputValue.value = index ? inputHistory.value[inputHistory.value.length - index] : "";
      break;
    default:
      index = 0;
      break;
  }
};

export function setInputHistory() {
  if (inputHistory.value[inputHistory.value.length - 1] === inputValue.value) return;
  inputHistory.value.push(inputValue.value);
}
