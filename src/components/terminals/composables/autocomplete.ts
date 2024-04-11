import { useMagicKeys, whenever } from "@vueuse/core";
import { computed, unref } from "vue";
import { i18n } from "@/i18n/locale";
import { inputRef, inputValue } from "@/input.store";
import { stateManager } from "@/state/state";

function useInputValue() {
  const totalFuncNames = computed(() => stateManager.currentState.value!.helps.map(({ name }) => name));

  function checkValue(value: string): number | number[] {
    const targetHelpIndexes: number[] = [];

    for (const nameIndex in totalFuncNames.value) {
      const index = Number(nameIndex);
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      const name = i18n.global.t(totalFuncNames.value[nameIndex]);
      const lowerCaseCheckValue = unref(value).trim().toLowerCase();
      if (name === lowerCaseCheckValue) return index;
      if (name !== lowerCaseCheckValue && name.startsWith(lowerCaseCheckValue)) targetHelpIndexes.push(index);
    }
    return targetHelpIndexes;
  }

  function checkInputValue(): number | number[] {
    return checkValue(inputValue.value);
  }

  return {
    checkValue,
    checkInputValue,
  };
}

function watchTabDown(checkInput: ReturnType<typeof useInputValue>["checkInputValue"]) {
  const { tab } = useMagicKeys();
  whenever(tab, async () => {
    const target = checkInput();
    if (!Array.isArray(target)) return;
    if (target.length === 1) {
      setTimeout(() => {
        inputRef.value?.focus();
      }, 0);

      return inputValue.value = `${i18n.global.t(stateManager.currentState.value!.helps[target[0]].name)} `;
    };
  });
}

export function useAutocomplete() {
  const { checkValue, checkInputValue } = useInputValue();

  watchTabDown(checkInputValue);

  return {
    checkValue,
    checkInputValue,
  };
}

export type UseAutocomplete = ReturnType<typeof useAutocomplete>;
