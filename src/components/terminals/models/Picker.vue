<script setup lang='ts'>
import { storeToRefs } from "pinia";
import type { VNodeRef } from "vue";
import { computed, ref } from "vue";
import { usePickerChecked } from "../composables/pickerChecked";
import { usePickerIndex } from "../composables/pickerIndex";
import { usePickerStore } from "@/core/picker";
import { usePickerDeg } from "@/composables/pickerDeg";
import TerminalText from "@/components/terminals/models/Text.vue";

const { activePickerIndex } = storeToRefs(usePickerStore());
const radioRef = ref<HTMLInputElement & VNodeRef>();

const { pickerIndex } = usePickerIndex();
const { deg } = usePickerDeg(activePickerIndex);

usePickerChecked(radioRef, pickerIndex);

const id = computed(() => `picker${pickerIndex.value}`);
</script>

<template>
  <input :id ref="radioRef" v-model="activePickerIndex" name="terminal-picker" type="radio" :value="pickerIndex">
  <label :for="id">
    <Suspense>
      <TerminalText />
    </Suspense>
  </label>
</template>

<style scoped>
@layer component {
  input[type='radio'] {
    --_size: .6em;
    --_bg-color: linear-gradient(145deg, #e81cff, #40c9ff);

    appearance: none;
    font: inherit;
    color: currentColor;

    height: var(--_size);
    aspect-ratio: 1;
    margin: 0 1em;

    display: grid;
    place-content: center;

    cursor: pointer;
    transition: all 1s var(--transition-timing-function);

    &::before {
      --border-width: 2px;
      --_color: linear-gradient(white, white);

      content: "";
      width: var(--_size);
      aspect-ratio: 1;

      padding: var(--border-width);
      background-image: var(--_bg-color);
      mask-image: var(--_color), var(--_color);
      mask-clip: content-box, padding-box;
      mask-composite: exclude;
      transition: all 1s var(--transition-timing-function);
    }

    &:focus {
      appearance: none;
      outline: none;
    }

    &:checked {
      background-image: var(--_bg-color);
      transform: rotate(v-bind(deg)) scale(1.1);
      border-radius: 2px;

      &::before {
        opacity: 0;
        transform: scale(0.9);
      }
    }
  }

  label {
    width: 100%;
  }
}
</style>
