<script setup lang='ts'>
import { unref } from "vue";
import { provideTexts } from "./composables/message";
import { useModels } from "./composables/models";
import TerminalTheme from "./TerminalTheme.vue";

const props = defineProps<{ message: Message }>();
const { models } = useModels();

provideTexts(props.message);
</script>

<template>
  <p class="terminal-message p-reset" :class="message.classes" :type="unref(message.type)">
    <TerminalTheme v-if="message.displayTheme" :need-raw="message.displayTheme" />
    <Suspense>
      <component :is="models[unref(message.type)]" v-if="message.main" :main="props.message.main" />
      <component :is="models[unref(message.type)]" v-else />
    </Suspense>
  </p>
</template>

<style scoped>
@layer component {
  .terminal-message {
    position: relative;
    color: var(--main-color);
    display: block;
    font-size: 18px;
    /* text-indent: 2em; */
  }

  .p-reset {
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>

<style scoped>
@import url("./styles/message.css") layer(component);
</style>
