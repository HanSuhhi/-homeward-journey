import sleep from "sleep-promise";
import { setConsoleDefaultMessage } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { togglePlace } from "@/core/place";
import { i18nLangModel } from "@/i18n/model";
import { allySay } from "@/components/terminals/contents/messages/ally.message";
import { stateManager } from "@/state/state";
import { GAME_STATE } from "@/state/state.enum";

export const wakeUpCommand: Command = {
  name: i18nLangModel.commands.wake_up.name,
  description: i18nLangModel.commands.wake_up.description,
  async effect() {
    await togglePlace("bedroom");
    await sleep(import.meta.env.GAP);

    setConsoleMatter();
    await setConsoleDefaultMessage(i18nLangModel.commands.wake_up[1]);
    await sleep(import.meta.env.GAP);
    await setConsoleDefaultMessage(i18nLangModel.commands.wake_up[2]);
    await sleep(import.meta.env.GAP);
    await allySay(i18nLangModel.commands.wake_up[3]);
    await sleep(import.meta.env.GAP);
    await setConsoleDefaultMessage(i18nLangModel.commands.wake_up[4]);
    await sleep(import.meta.env.GAP);
    await setConsoleDefaultMessage(i18nLangModel.commands.wake_up[5]);
    await sleep(import.meta.env.GAP);
    await allySay(i18nLangModel.commands.wake_up[6]);
    await sleep(import.meta.env.GAP);
    await setConsoleDefaultMessage(i18nLangModel.commands.wake_up[7]);

    stateManager.switchState(GAME_STATE.In_bedroom);
  },
};
