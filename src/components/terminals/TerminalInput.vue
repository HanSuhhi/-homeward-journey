<script setup lang='ts'>
import TerminalTheme from "./TerminalTheme.vue";
import Cockpit from "@/components/Cockpit.vue";
import { useInputController, watchQuestionMarkDown } from "@/core/inputController";
import { inputDisabled, inputRef, inputValue, inputVisible } from "@/input.store";

watchQuestionMarkDown();
useInputController();
</script>

<template>
  <div v-show="inputVisible" class="terminal-input">
    <TerminalTheme />
    <input ref="inputRef" v-model="inputValue" :disabled="inputDisabled" class="terminal-input_input input-reset">
  </div>
  <Cockpit v-show="inputVisible" class="terminal-cockpit" />
</template>

<style scoped>
@layer component {

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

  .terminal-cockpit {
    margin-top: var(--base-margin);
  }
}
</style>
