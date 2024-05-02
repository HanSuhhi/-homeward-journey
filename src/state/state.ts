import { computed, ref } from "vue";
import type { State, StateCreator } from "./models/creator";
import type { GAME_STATE } from "./state.enum";
import { i18nLangModel } from "@/i18n/model";

const states = import.meta.glob<StateCreator>(["./models/*.state.ts", "./models/**/*.state.ts"], { eager: true, import: "default" });

for (const key in states) {
  const componentName = key.match(/\/([^\/]+)\.state\.ts$/)![1].toLowerCase();
  states[componentName] = states[key];
  delete states[key];
}

function useState() {
  const state = ref<GAME_STATE>();
  const currentState = ref<State>();
  const currentStateName = computed(() => state.value ? i18nLangModel.states[state.value].stateName : "");

  async function switchState(newState: GAME_STATE) {
    try {
      currentState.value = states[newState]();
      state.value = newState;
      await currentState.value.runAllEnters();
    }
    catch (error) {
      console.warn(error);
    }
  }

  return {
    state,
    switchState,
    currentState,
    currentStateName,
  };
}

export const stateManager = useState();
