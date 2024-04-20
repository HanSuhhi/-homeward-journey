<script setup lang='ts'>
import TerminalMessage from "./terminals/TerminalMessage.vue";
import { useInputCheck } from "@/composables/cockpit";

const { commands } = useInputCheck();

function getKey(message: Message) {
  return Reflect.get(message, "id");
}
</script>

<template>
  <div class="cockpit">
    <template v-if="commands.length">
      <TerminalMessage v-for="message of commands" :key="getKey(message)" :message />
    </template>
  </div>
</template>

<style scoped>
@layer component {
  .cockpit {
    padding: var(--normal);

    >.message-role_cockpit:has(input:checked) {
      background-color: #ffffff0f;
    }
  }
}
</style>
