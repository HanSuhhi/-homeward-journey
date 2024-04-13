import { setConsoleCommandMessageText, setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { stateManager } from "@/state/state";

const model = i18nLangModel.commands.help;

export const helpCommand: Command = {
  name: model.name,
  description: model.description,
  hide: true,
  effect() {
    setConsoleMatter();
    const commands = stateManager.currentState.value?.commands ?? [];
    setConsoleMessageText(model.welcome);
    for (const command of commands) {
      if (command.hide) continue;
      setConsoleCommandMessageText(command);
    }
  },
  children: [
    // all
    {
      name: model.all.name,
      description: model.all.description,
      effect() {
        setConsoleMatter();
        const commands = stateManager.currentState.value?.commands ?? [];
        setConsoleMessageText(model.welcome);
        for (const command of commands)
          setConsoleCommandMessageText(command);
      },
    },
    // hide
    {
      name: model.hide.name,
      description: model.hide.description,
      effect() {
        setConsoleMatter();
        const commands = stateManager.currentState.value?.commands ?? [];
        setConsoleMessageText(model.welcome);
        for (const command of commands) {
          if (!command.hide) continue;
          setConsoleCommandMessageText(command);
        }
      },
    },
  ],
};
