import { useMagicKeys, whenever } from "@vueuse/core";
import { computed } from "vue";
import { completeCommand, modifyLastInputCommandSplit, runCommand } from "./command";
import { createSingleHelpCommand } from "@/commands/help.command";
import { inNoCommandInput } from "@/composables/input";
import { setInputMatter } from "@/core/matters";
import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { questionMark } from "@/i18n/vars";
import { inputValue, inputValueSplits, inputVisible } from "@/input.store";
import { setInputHistory } from "@/composables/inputHistory";

function watchTabDown() {
  const { tab } = useMagicKeys();

  whenever(tab, completeCommand);
}

function watchQuestionMarkDown() {
  const enterQuestionMark = computed(() => inputValue.value.endsWith(questionMark));
  whenever(enterQuestionMark, questionMarkDown);

  async function questionMarkDown() {
    setInputMatter(inputValue.value);

    await modifyLastInputCommandSplit(async ({ command, fullCommandTxt }) => {
      const inputSplits = [...inputValueSplits.value];
      const inputLastSplit = inputSplits.pop();

      inputValue.value = fullCommandTxt;

      // 开始使用
      if (inputLastSplit === questionMark) {
        const command = `${inputSplits.join(" ")} ${i18n.global.t(i18nLangModel.commands.help.name)}`;
        await runCommand(command);
      }
      // 中间使用
      else {
        if (!command) inNoCommandInput();
        if (Array.isArray(command)) await createSingleHelpCommand(command).effect?.();

        else console.warn("one");
      }
    });
  }
}

export function useKeydown() {
  function useKeyDown(fn: () => any) {
    inputVisible.value = false;
    return Promise.resolve(setInputMatter(inputValue.value))
      .then(fn)
      .catch(inNoCommandInput)
      .finally(() => inputVisible.value = true);
  }

  function enterDown() {
    useKeyDown(async () => {
      if (inputValue.value === "") return;
      runCommand(inputValue.value);

      setInputHistory();
    });
  }

  watchTabDown();
  watchQuestionMarkDown();

  return {
    enterDown,
  };
}
