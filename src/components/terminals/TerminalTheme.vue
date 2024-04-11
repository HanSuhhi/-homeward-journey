<script setup lang='ts'>
import { toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { stateManager } from "@/state/state";

const { needRaw = false } = defineProps<{
  needRaw?: boolean;
}>();

const { t } = useI18n();
const model = needRaw ? toRaw(stateManager.currentStateName.value) : stateManager.currentStateName;
</script>

<template>
  <div class="terminal-theme">
    <span>
      [{{ stateManager.currentStateName.value && t(model).toString() }}]
    </span>
    #
  </div>
</template>

<style scoped>
@layer component {
  .terminal-theme {
    margin-right: var(--small);
    display: inline-block;
  }
}
</style>
