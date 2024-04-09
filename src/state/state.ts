import { ref } from "vue";
import type { State, StateCreator } from "./models/creator";
import type { GameState } from "./state.enum";

const states = import.meta.glob<StateCreator>(["./models/*.state.ts", "./models/**/*.state.ts"], { eager: true, import: "default" });

for (const key in states) {
  const componentName = key.match(/\/([^\/]+)\.state\.ts$/)![1].toLowerCase();
  states[componentName] = states[key];
  delete states[key];
}

function useState() {
  const state = ref<GameState>();
  const mainState = ref<GameState>();
  const currentState = ref<State>();

  async function switchState(newState: GameState) {
    currentState.value = states[newState]();
    state.value = newState;
    await currentState.value.runAllEnters();
  }

  return {
    state,
    switchState,
    currentState,
  };
}

export const stateManager = useState();
