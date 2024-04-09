import "./styles/config.css";
import "./styles/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n/locale";
import { initInput } from "./input.store";
import { stateManager } from "./state/state";
import { GameState } from "./state/state.enum";

createApp(App)
  .use(i18n)
  .mount("#app");

initInput();
await stateManager.switchState(GameState.Init);
