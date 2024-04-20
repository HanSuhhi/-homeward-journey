<script setup lang="ts">
import { storeToRefs } from "pinia";
import Terminal from "./components/terminals/Terminal.vue";
import { usePickerStore } from "./core/picker";

const { total, activePickerIndex } = storeToRefs(usePickerStore());
</script>

<template>
  {{ total }}
  {{ activePickerIndex }}
  <Terminal class="app-terminal" />
</template>
