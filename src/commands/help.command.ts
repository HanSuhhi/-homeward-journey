import { defineCommand } from "./creator";
import { setConsoleCommandMessageText, setConsoleDefaultMessageText } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { stateManager } from "@/state/state";

const model = i18nLangModel.commands.help;

export function createSingleHelpCommand(parentCommands?: Command[]): Command {
  return {
    name: model.name,
    description: model.description,
    hide: true,
    effect() {
      setConsoleMatter();

      const commands = (parentCommands || stateManager.currentState.value?.commands || []).filter(({ hide }) => !hide);
      if (!commands.length) return setConsoleDefaultMessageText(model.no_helps);

      setConsoleDefaultMessageText(model.welcome);

      for (const command of commands) setConsoleCommandMessageText(command);
    },
  };
}

export const helpCommand: Command = defineCommand({
  ...createSingleHelpCommand(),
  children: [
    // all
    {
      name: model.all.name,
      description: model.all.description,
      effect() {
        setConsoleMatter();

        const commands = helpCommand.children ?? [];
        if (!commands.length) return setConsoleDefaultMessageText(model.no_helps);

        setConsoleDefaultMessageText(model.welcome);
        for (const command of commands) setConsoleCommandMessageText(command);
      },
    },
    // hide
    {
      name: model.hide.name,
      description: model.hide.description,
      effect() {
        setConsoleMatter();

        const commands = helpCommand.children?.filter(({ hide }) => hide) ?? [];
        if (!commands.length) return setConsoleDefaultMessageText(model.no_helps);

        setConsoleDefaultMessageText(model.welcome);
        for (const command of commands) {
          if (!command.hide) continue;
          setConsoleCommandMessageText(command);
        }
      },
    },
  ],
});
