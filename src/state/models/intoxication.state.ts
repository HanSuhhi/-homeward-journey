import { defineState } from "./creator";
import { setConsoleDefaultMessageText } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";

export default defineState(({ setCommand }) => {
  setCommand({
    name: i18nLangModel.states.intoxication.commands.wake_up.name,
    description: i18nLangModel.states.intoxication.commands.wake_up.description,
    effect() {
      setConsoleMatter();
      setConsoleDefaultMessageText("醒来了");
    },
  });
});
