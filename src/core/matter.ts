import { computed, shallowReactive } from "vue";

type GlobalMatter = Matter[];

function createMatter() {
  const globalMatters = shallowReactive<GlobalMatter>([]);
  const currentMatter = computed(() => globalMatters[globalMatters.length - 1]);

  return {
    globalMatters,
    currentMatter,
  };
}

const { globalMatters, currentMatter } = createMatter();

export {
  globalMatters,
  currentMatter,
};
