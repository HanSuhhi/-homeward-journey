import { useMagicKeys, whenever } from "@vueuse/core";
import { completeCommand, validateInputValue } from "./validate";
import { inNoCommandInput } from "@/composables/input";
import { setInputMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { inputValue, inputVisible } from "@/input.store";
import { stateManager } from "@/state/state";

function watchTabDown() {
  const { tab } = useMagicKeys();

  whenever(tab, completeCommand);
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
      validateInputValue();
    });
  }

  // @TODO
  async function questionMarkDown() {
    setTimeout(async () => {
      setInputMatter(inputValue.value);
      const targetCommand = stateManager.currentState.value?.commands.find(({ name }) => name === i18nLangModel.commands.help.name);
      targetCommand?.effect && await targetCommand.effect();
      inputValue.value = inputValue.value.slice(0, -1);
    }, 0);
  }

  watchTabDown();

  return {
    enterDown,
    questionMarkDown,

  };
}
