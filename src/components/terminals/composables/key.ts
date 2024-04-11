import type { UseAutocomplete } from "./autocomplete";
import { inNoCommandInput } from "@/composables/input";
import { setInputMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { inputValue, inputVisible } from "@/input.store";
import { stateManager } from "@/state/state";

export function useKeys(checkInputValue: UseAutocomplete["checkInputValue"]) {
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
      const target = checkInputValue();

      if (!Array.isArray(target)) return await stateManager.currentState.value?.helps[target].effect();
      if (target.length === 1) return await stateManager.currentState.value?.helps[target[0]].effect();

      throw new Error("err");
    });
  }

  // @TODO
  async function questionMarkDown() {
    setTimeout(async () => {
      setInputMatter(inputValue.value);
      const helpCommand = stateManager.currentState.value?.helps.find(({ name }) => name === i18nLangModel.common_commands.help.name);
      await helpCommand?.effect();
      inputValue.value = inputValue.value.slice(0, -1);
    }, 0);
  }

  return {
    enterDown,
    questionMarkDown,
  };
}
