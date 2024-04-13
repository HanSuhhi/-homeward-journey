import { setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { stateManager } from "@/state/state";
import { GAME_STATE } from "@/state/state.enum";

export const settingCommand: Command = {
  name: i18nLangModel.commands.setting.name,
  description: i18nLangModel.commands.setting.description,
  hide: true,
  effect() {
    setConsoleMatter();
    stateManager.switchState(GAME_STATE.Setting);
    setConsoleMessageText(i18nLangModel.states.setting.success);
  },
};
