import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useMagicKeys, whenever } from "@vueuse/core";
import { useCockpitStore } from "./cockpit";
import { useInputHistory } from "./inputHistory";
import { inInputState } from "./inputState";
import { setInputMatter } from "./matters";
import { usePickerStore } from "./picker";
import { focusInput, inputRef, inputValue, inputValueSplits, inputVisible } from "@/input.store";
import { i18nLangModel } from "@/i18n/model";
import { inNoCommandInput } from "@/composables/input";
import { completeCommand, modifyLastInputCommandSplit, runCommand } from "@/components/terminals/composables/command";
import { Blank, questionMark } from "@/i18n/vars";
import { createSingleHelpCommand } from "@/commands/help.command";
import { i18n } from "@/i18n/locale";

export function watchQuestionMarkDown() {
  const enterQuestionMark = computed(() => inputValue.value.endsWith(questionMark));
  async function questionMarkDown() {
    setInputMatter(inputValue.value);

    await modifyLastInputCommandSplit(async ({ command, fullCommandTxt }) => {
      const inputSplits = [...inputValueSplits.value];
      const inputLastSplit = inputSplits.pop();

      inputValue.value = fullCommandTxt;

      if (inputLastSplit === questionMark) {
        const command = `${inputSplits.join(Blank)} ${i18n.global.t(i18nLangModel.commands.help.name)}`;
        await runCommand(command);
      }
      // ? in the text
      else {
        if (!command) inNoCommandInput();
        if (Array.isArray(command)) await createSingleHelpCommand(command).effect?.();
        else console.warn("one");
      }
    });
  }

  whenever(enterQuestionMark, questionMarkDown);
}

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
          activePickerIndex.value = 0;
        });
    }

    const lastSpaceIndex = inputValue.value.lastIndexOf(Blank);
    if (lastSpaceIndex === -1) inputValue.value = "";
    else inputValue.value.substring(0, lastSpaceIndex);

    inputValue.value += `${t(model)} `;

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
  }

  function arrowLeft() {
    if (inputHistory.value.length <= index) return index;

    index++;
    inputRef.value?.blur();
    inputValue.value = inputHistory.value[inputHistory.value.length - index];
    focusInput();
  }

  function arrowRight() {
    if (!index) return;
    index--;
    inputValue.value = index ? inputHistory.value[inputHistory.value.length - index] : "";
  }

  function arrowUp() {
    if (!activePickerIndex.value) activePickerIndex.value = total.value - 1;
    else activePickerIndex.value--;

    if (inInputState.value) focusInput();
  }

  function arrowDown() {
    if (activePickerIndex.value === total.value - 1) activePickerIndex.value = 0;
    else activePickerIndex.value++;

    if (inInputState.value) focusInput();
  }

  onMounted(() => {
    const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Tab, Enter } = useMagicKeys();
    whenever(ArrowLeft, arrowLeft);
    whenever(ArrowRight, arrowRight);
    whenever(ArrowUp, arrowUp);
    whenever(ArrowDown, arrowDown);
    whenever(Tab, completeCommand);
    whenever(Enter, enterEvent);
  });
}
