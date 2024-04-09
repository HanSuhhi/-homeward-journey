<script setup lang='ts'>
import TerminalTheme from "../TerminalTheme.vue";
import { provideTexts } from "./composables/message";
import { useModels } from "./composables/models";

const props = defineProps<{ message: Message }>();
const { models } = useModels();

provideTexts(props.message);
</script>

<template>
  <code class="terminal-text" :class="props.message.classes">
    <TerminalTheme v-if="props.message.displayTheme" />
    <component :is="models[props.message.type]" />
  </code>
</template>

<style scoped>
@layer component {
  .terminal-text {
    color: var(--main-color);
    display: block;
  }
}
</style>

<style scoped>
@import url("./styles/message.css") layer(component);
</style>
