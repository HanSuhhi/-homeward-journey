import "./styles/config.css";
import "./styles/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { i18n } from "./i18n/locale";
import { initInput } from "./input.store";
import { stateManager } from "./state/state";
import { GAME_STATE } from "./state/state.enum";

createApp(App)
  .use(i18n)
  .use(createPinia())
  .mount("#app");

initInput();
await stateManager.switchState(GAME_STATE.Init);
