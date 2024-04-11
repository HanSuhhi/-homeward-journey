import { stateManager } from "./state";
import { GAME_STATE } from "./state.enum";
import { setConsoleHelpMessageText, setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";

export const commonHelps: Help[] = [
  {
    name: i18nLangModel.common_commands.help.name,
    description: i18nLangModel.common_commands.help.description,
    hide: true,
    effect() {
      setConsoleMatter();
      const helps = stateManager.currentState.value?.helps ?? [];
      setConsoleMessageText(i18nLangModel.common_commands.help.welcome);
      for (const help of helps) {
        if (help.hide) continue;
        setConsoleHelpMessageText(help);
      }
    },
  },
  {
    name: i18nLangModel.common_commands.setting.name,
    description: i18nLangModel.common_commands.setting.description,
    hide: true,
    effect() {
      setConsoleMatter();
      stateManager.switchState(GAME_STATE.Setting);
      setConsoleMessageText(i18nLangModel.states.setting.success);
    },
  },
];
