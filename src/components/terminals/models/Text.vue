<script setup lang='ts'>
import { isRef, unref } from "vue";
import { useI18n } from "vue-i18n";
import { injectTexts } from "../composables/message";

const { te, t } = useI18n();
const { texts } = await injectTexts();

function showText(text: TextModel) {
  if (typeof text === "string") return te(text.trim()) ? t(text).trim() : text.trim();
  if (isRef(text)) return te(unref(text).trim()) ? t(unref(text).trim()) : unref(text).trim();
  return t(unref(text.model), text.props);
}
</script>

<template>
  <span v-for="{ model, classes }, index of texts" :key="index" :class="classes">
    {{ showText(model) }}
  </span>
</template>

<style scoped>
@import url("../styles/text.css") layer(component);
</style>
