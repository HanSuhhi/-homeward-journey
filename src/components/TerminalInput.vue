<script setup lang='ts'>
import TerminalTheme from "./TerminalTheme.vue";
import { inNoCommandInput } from "@/composables/input";
import { setInputMatter } from "@/core/matters";
import { i18n } from "@/i18n/locale";
import { inputRef, inputValue, inputVisible } from "@/input.store";
import { stateManager } from "@/state/state";

async function keydown() {
  inputVisible.value = false;

  Promise.resolve()
    .then(async () => {
      setInputMatter(inputValue.value);

      if (inputValue.value === "") return;
      const totalFuncNames = stateManager.currentState.value!.helps.map(({ name }) => name);
      const tempNames: number[] = [];

      for (const nameIndex in totalFuncNames) {
        const index = Number(nameIndex);
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        const name = i18n.global.t(totalFuncNames[nameIndex]);
        const lowerCaseInputValue = inputValue.value.toLowerCase();
        if (name === lowerCaseInputValue) return await stateManager.currentState.value?.helps[index].effect();
        if (name !== lowerCaseInputValue && name.startsWith(lowerCaseInputValue)) tempNames.push(index);
      }

      if (tempNames.length === 1) return await stateManager.currentState.value?.helps[tempNames[0]].effect();
      throw new Error("err");
    })
    .catch(inNoCommandInput)
    .finally(() => inputVisible.value = true);
}
</script>

<template>
  <code v-show="inputVisible" :s="inputVisible" class="terminal-input">
    <TerminalTheme />
    <input ref="inputRef" v-model="inputValue" class="terminal-input_input input-reset" @keydown.enter="keydown">
  </code>
</template>

<style scoped>
.input-reset {
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  padding-block: 0;
  padding-inline: 0;
}

.terminal-input {
  display: flex;
  align-items: center;
  color: var(--main-color);
}

.terminal-input_input {
  width: 100%;
  color: var(--main-color);
  font-size: var(--font-body);
  font-family: monospace;
}
</style>
