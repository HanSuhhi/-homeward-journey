import { useStorage } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { inInputState } from "./inputState";
import { usePickerStore } from "./picker";
import { focusInput, inputRef, inputValue } from "@/input.store";

export function useInputController() {
  const { activePickerIndex, total } = storeToRefs(usePickerStore());
  const inputHistory = useStorage<string[]>("history", []);

  let index = 0;
  onMounted(() => {
    window.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (inputHistory.value.length <= index) return index;

          index++;
          inputRef.value?.blur();
          inputValue.value = inputHistory.value[inputHistory.value.length - index];
          focusInput();
          break;
        case "ArrowRight":
          if (!index) return;
          index--;
          inputValue.value = index ? inputHistory.value[inputHistory.value.length - index] : "";
          break;

        case "ArrowUp": {
          e.preventDefault();
          console.log(activePickerIndex, total);

          if (!activePickerIndex.value) activePickerIndex.value = total.value - 1;
          else activePickerIndex.value--;

          if (inInputState.value) focusInput();

          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          if (activePickerIndex.value === total.value - 1) activePickerIndex.value = 0;
          else activePickerIndex.value++;

          if (inInputState.value) focusInput();

          break;
        }
        case "Enter": {
          //   const messages = globalMatters[globalMatters.length - 1].messages;

          //   for (let index = messages.length - 1; index >= 0; index--) {
          //     const { type, classes } = messages[index];

          //     if (unref(type) !== "picker") continue;

          //     if (activePickerIndex.value !== index) {
          //       setTimeout(() => messages.splice(index, 1), 0);
          //       continue;
          //     };

          //     classes!.push(messageTypes.picker_checked);

          //     if (isRef(type)) type.value = "text";

          //     await pickerStore.runPickerEvent();
          //   }

          //   inputState.value = InputState.Input;
          break;
        }

        default:
          index = 0;
          break;
      }
    };
  });

  function setInputHistory() {
    if (inputHistory.value[inputHistory.value.length - 1] === inputValue.value) return;
    if (!inputValue.value) return;
    inputHistory.value.push(inputValue.value);
  }

  return {
    setInputHistory,
  };
}
