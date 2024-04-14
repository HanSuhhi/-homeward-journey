import { createSingleHelpCommand } from "./help.command";

export function defineCommand(command: Command): Command {
  command.children?.forEach((c) => {
    defineCommand(c);
  });

  command.children = command.children || [];
  command.children.push(createSingleHelpCommand(command.children));

  return command;
}
