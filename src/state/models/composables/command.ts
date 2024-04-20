import { helpCommand } from "@/commands/help.command";
import { settingCommand } from "@/commands/setting.command";

export function useCommand() {
  const commands: Command[] = [
    helpCommand,
    settingCommand,
  ];

  const setCommand = (cmd: Command) => {
    commands.push(cmd);
  };

  return {
    commands,
    setCommand,
  };
}
