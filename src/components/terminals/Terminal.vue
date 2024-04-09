<script setup lang="ts">
import TerminalText from "./TerminalText.vue";
import { globalMatters } from "@/core/matter";
import TerminalInput from "@/components/TerminalInput.vue";

function getKey(message: Message) {
  return Reflect.get(message, "id");
}
</script>

<template>
  <div class="terminal">
    <article class="terminal-main">
      <section v-for="{ messages, classes }, key of globalMatters" :key class="matter" :class="classes">
        <TerminalText v-for="message of messages" :id="`text-${getKey(message)}`" :key="getKey(message)" :message />
      </section>
    </article>
    <TerminalInput />
  </div>
</template>

<style scoped>
@layer page {
  .terminal {
    max-height: 100vh;
    overflow-y: none;
    padding: var(--small);

    .terminal-main {
      width: 100%;

    }
  }
}
</style>

<style scoped>
@import url("./styles/matter.css") layer(component);
</style>
