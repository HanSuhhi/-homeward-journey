import { useMagicKeys, whenever } from "@vueuse/core";
import { computed } from "vue";
import { completeCommand, modifyLastInputCommandSplit, runCommand } from "./command";
import { createSingleHelpCommand } from "@/commands/help.command";
import { inNoCommandInput } from "@/composables/input";
import { inInputState } from "@/core/inputState";
import { setInputMatter } from "@/core/matters";
import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { Blank, questionMark } from "@/i18n/vars";
import { inputValue, inputValueSplits, inputVisible } from "@/input.store";
import { useInputController } from "@/core/inputController";

function watchTabDown() {
  const { tab } = useMagicKeys();

  whenever(tab, completeCommand);
}

function watchQuestionMarkDown() {
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

export function useKeydown() {
  const { setInputHistory } = useInputController();

  function useKeyDown(fn: () => any) {
    inputVisible.value = false;
    return Promise.resolve(setInputMatter(inputValue.value))
      .then(fn)
      .then(setInputHistory)
      .catch(async (err) => {
        console.warn(err);
        await inNoCommandInput();
      })
      .finally(() => {
        if (inInputState.value) inputVisible.value = true;
      });
  }

  function enterDown() {
    useKeyDown(async () => {
      if (inputValue.value === "") return;
      await runCommand(inputValue.value);
    });
  }

  watchTabDown();
  watchQuestionMarkDown();

  return {
    enterDown,
  };
}
