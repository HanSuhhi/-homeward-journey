import { setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";

export const commonHelps: Help[] = [
  {
    name: i18nLangModel.common_commands.help.name,
    description: i18nLangModel.common_commands.help.description,
    hide: true,
    effect() {
      setConsoleMatter();
      // setConsoleMessageText("帮助");
    },
  },
  {
    name: i18nLangModel.common_commands.setting.name,
    description: i18nLangModel.common_commands.setting.description,
    hide: true,
    effect() {
      setConsoleMatter();
      setConsoleMessageText(i18nLangModel.states.setting.success);
    },
  },
];
