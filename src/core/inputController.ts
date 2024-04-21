import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useCockpitStore } from "./cockpit";
import { useInputHistory } from "./inputHistory";
import { inInputState } from "./inputState";
import { setInputMatter } from "./matters";
import { usePickerStore } from "./picker";
import { focusInput, inputRef, inputValue, inputVisible } from "@/input.store";
import { i18nLangModel } from "@/i18n/model";
import { inNoCommandInput } from "@/composables/input";
import { runCommand } from "@/components/terminals/composables/command";
import { Blank } from "@/i18n/vars";

export function useInputController() {
  const { inputHistory, setInputHistory } = useInputHistory();
  const { activePickerIndex, total } = storeToRefs(usePickerStore());
  const { commands } = storeToRefs(useCockpitStore());
  const { t } = useI18n();
  let index = 0;

  function enterEvent() {
    const { texts: [{ model }] }: any = commands.value[activePickerIndex.value];

    // 判断是否为执行
    if (model === i18nLangModel.commands.run.name) {
      inputVisible.value = false;
      return Promise.resolve(setInputMatter(inputValue.value))
        .then(async () => {
          if (inputValue.value === "") return;
          await runCommand(inputValue.value);
        })
        .then(setInputHistory)
        .catch(async (err) => {
          console.warn(err);
          await inNoCommandInput();
        })
        .finally(() => {
          if (inInputState.value) inputVisible.value = true;
        });
    }

    const lastSpaceIndex = inputValue.value.lastIndexOf(Blank);
    if (lastSpaceIndex === -1) inputValue.value = "";
    else inputValue.value.substring(0, lastSpaceIndex);

    inputValue.value += `${t(model)} `;
  }

  function ArrorLeft() {
    if (inputHistory.value.length <= index) return index;

    index++;
    inputRef.value?.blur();
    inputValue.value = inputHistory.value[inputHistory.value.length - index];
    focusInput();
  }

  function ArrorRight() {
    if (!index) return;
    index--;
    inputValue.value = index ? inputHistory.value[inputHistory.value.length - index] : "";
  }

  function ArrowUp() {
    if (!activePickerIndex.value) activePickerIndex.value = total.value - 1;
    else activePickerIndex.value--;

    if (inInputState.value) focusInput();
  }

  function ArrowDown() {
    if (activePickerIndex.value === total.value - 1) activePickerIndex.value = 0;
    else activePickerIndex.value++;

    if (inInputState.value) focusInput();
  }

  onMounted(() => {
    window.onkeydown = async (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          ArrorLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          ArrorRight();
          break;
        case "ArrowUp":
          e.preventDefault();
          ArrowUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          ArrowDown();
          break;
        case "Enter": {
          e.preventDefault();
          enterEvent();

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
          break;
      }
    };
  });
}
