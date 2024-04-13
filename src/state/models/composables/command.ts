import { helpCommand } from "@/commands/help.command";

export function useCommand() {
  const commands: Command[] = [
    helpCommand,
    // settingCommand,
  ];

  const setCommand = (cmd: Command) => {
    commands.push(cmd);
  };

  return {
    commands,
    setCommand,
  };
}
