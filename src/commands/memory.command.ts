import sleep from "sleep-promise";
import { setConsoleDefaultMessage, setEnemyDefaultMessage } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { getRandomElement } from "@/utils/array";

const model = i18nLangModel.commands.memory;

const results = [
  model.enemyTxts1,
  model.enemyTxts2,
];

export const memoryCommand: Command = {
  name: model.name,
  description: model.description,
  async effect() {
    setConsoleMatter();
    setConsoleDefaultMessage(model.syslog);
    await sleep(import.meta.env.GAP);
    setEnemyDefaultMessage(getRandomElement(results)!);
  },
};
