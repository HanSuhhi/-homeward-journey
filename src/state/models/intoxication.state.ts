import { defineState } from "./creator";
import { setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";

export default defineState(({ setHelp }) => {
  setHelp({
    name: i18nLangModel.states.intoxication.helps.wake_up.name,
    description: i18nLangModel.states.intoxication.helps.wake_up.description,
    effect() {
      setConsoleMatter();
      setConsoleMessageText("醒来了");
    },
  });
});
