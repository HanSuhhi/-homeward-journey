import sleep from "sleep-promise";
import { stateManager } from "../state";
import { GameState } from "../state.enum";
import { defineState } from "./creator";
import { setConsoleMessageText } from "@/components/characters/console/message";
import { setTitleMatter } from "@/core/matters";
import { setMessage } from "@/core/message";
import { i18nLangModel } from "@/i18n/model";
import { inputVisible } from "@/input.store";

export default defineState(({ onEntered }) => {
  onEntered(async () => {
    setTitleMatter();
    const title: Message = {
      type: "text",
      classes: "message-game-title",
      texts: {
        model: i18nLangModel.states.init.title,
        classes: ["window"],
      },
    };
    setMessage(title);

    await sleep(import.meta.env.GAP);

    const beginWords = [
      i18nLangModel.states.init[1],
      i18nLangModel.states.init[2],
      i18nLangModel.states.init[3],
    ];

    const eHkwnY2Xi: Message = {
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
    for (const word of beginWords) setConsoleMessageText(word);
    setMessage(eHkwnY2Xi);

    stateManager.switchState(GameState.Intoxication);
    inputVisible.value = true;

    setMessage({ type: "hr" });
  });
});
