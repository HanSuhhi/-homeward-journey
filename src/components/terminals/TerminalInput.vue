<script setup lang='ts'>
import TerminalTheme from "./TerminalTheme.vue";
import { useKeydown } from "./composables/keydown";
import { inputDisabled, inputRef, inputValue, inputVisible } from "@/input.store";

const { enterDown } = useKeydown();
</script>

<template>
  <code v-show="inputVisible" :s="inputVisible" class="terminal-input">
    <TerminalTheme />
    <input ref="inputRef" v-model="inputValue" :disabled="inputDisabled" class="terminal-input_input input-reset" @keydown.enter="enterDown">
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
  flex: 1;
}
</style>./composables/keydown
