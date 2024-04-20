import sleep from "sleep-promise";
import { stateManager } from "../state";
import { GAME_STATE } from "../state.enum";
import { defineState } from "./creator";
import { setConsoleDefaultMessageText } from "@/components/terminals/contents/messages/message";
import { setTitleMatter } from "@/core/matters";
import { setMessage } from "@/core/message";
import { i18nLangModel } from "@/i18n/model";
import { inputVisible } from "@/input.store";

export default defineState(({ onEntered }) => {
  onEntered(async () => {
    setTitleMatter();
    const title: MessageCreator = {
      type: "text",
      classes: "message-game-title",
      texts: {
        model: i18nLangModel.states.init.title,
        classes: ["window"],
      },
    };
    await setMessage(title);

    await sleep(import.meta.env.GAP);

    const beginWords = [
      i18nLangModel.states.init[1],
      i18nLangModel.states.init[2],
      i18nLangModel.states.init[3],
    ];

    const eHkwnY2Xi: MessageCreator = {
      type: "text",
      texts: [
        {
          model: i18nLangModel.states.init["4_1"],
          classes: ["window"],
        },
        {
          model: i18nLangModel.states.init["4_2"],
          classes: ["window text-main"],
        },
        {
          model: i18nLangModel.states.init["4_3"],
          classes: ["window"],
        },
      ],
    };
    for (const word of beginWords) setConsoleDefaultMessageText(word);
    await setMessage(eHkwnY2Xi);

    stateManager.switchState(GAME_STATE.Intoxication);
    inputVisible.value = true;

    await setMessage({ type: "hr" });
  });
});
