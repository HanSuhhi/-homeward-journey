<script setup lang='ts'>
import { computed, toRaw, unref } from "vue";
import { useI18n } from "vue-i18n";
import { stateManager } from "@/state/state";
import { place } from "@/core/place";
import { i18nLangModel } from "@/i18n/model";

const { needRaw = false } = defineProps<{
  needRaw?: boolean;
}>();

const { t, te } = useI18n();

// @TODO ugly-code
const model = needRaw ? toRaw(stateManager.currentStateName.value) : stateManager.currentStateName;
const stateModel = computed(() => (stateManager.currentStateName.value && t(unref(model)).toString()));

// place
// @TODO ugly-code
const targetPlace = computed(() => i18nLangModel.place[place.value!]?.name || "");
const placeModel = needRaw ? toRaw(targetPlace.value) : targetPlace;
const showingPlace = computed(() => place && targetPlace && (te(unref(placeModel)) ? t(unref(placeModel)) : placeModel));
</script>

<template>
  <div class="terminal-theme">
    <span>
      [{{ unref(showingPlace) || unref(stateModel) }}]
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
