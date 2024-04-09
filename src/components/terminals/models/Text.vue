<script setup lang='ts'>
import { unref } from "vue";
import { useI18n } from "vue-i18n";
import { injectTexts } from "../composables/message";

const { showingTexts } = injectTexts();
const { te, t } = useI18n();
</script>

<template>
  <span v-for="[text, { classes }], index of showingTexts" :key="index" :class="classes">
    {{ te(unref(text).trim()) ? t(unref(text).trim()) : unref(text).trim() }}
  </span>
</template>

<style scoped>
@import url("../styles/text.css") layer(component);
</style>
