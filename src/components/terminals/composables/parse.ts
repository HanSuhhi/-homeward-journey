import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { stateManager } from "@/state/state";

function compareStringSimilarity(inputCommand: string, commands: Command[]) {
  const userCommand = inputCommand.trim().toLowerCase();

  const partials: number[] = [];

  for (const _index in commands) {
    const index = Number(_index);
    const { name } = commands[index];
    const presetCommand = i18n.global.t(name).trim().toLowerCase();

    if (presetCommand.includes(userCommand)) partials.push(index);
    if (userCommand === presetCommand) return index;
  }

  if (partials.length === 0) return partials;
  else if (partials.length === 1) return partials[0];
  else return partials;
}

export enum ParseInputResult {
  NoEffect,
  Run,
  TooMuchArgs,
  NoSuchCommand,
  TooMuchResult,
}

export async function parseInputValue(
  value: string,
  filterHide = false,
): Promise<ParseInputResult.NoSuchCommand | [result: ParseInputResult, command: Command] | [result: ParseInputResult.TooMuchResult, commands: Command[]]> {
  let commands = stateManager.currentState.value!.commands;
  if (filterHide) commands = commands.filter(command => !command.hide);

  const inputCommandSplits = value.trim().split(/\s+/);

  const haveSpace = value.endsWith(" ");
  if (haveSpace) inputCommandSplits.push("");

  while (inputCommandSplits.length) {
    // 检验指令参数
    const commandSplit = inputCommandSplits.shift()!;
    const commandIndex = compareStringSimilarity(commandSplit, commands);

    if (typeof commandIndex === "number") {
      const currentCommand = commands[commandIndex];

      // 当用户输入指令解析完成时
      if (!inputCommandSplits.length) {
        // 当前指令不可执行
        if (!currentCommand.effect) return [ParseInputResult.NoEffect, currentCommand];
        // 当前指令可执行
        else return [ParseInputResult.Run, currentCommand];
      }

      // 当用户指令仍未解析完成
      else {
        // 指令已无更多参数
        if (!currentCommand.children?.length) return [ParseInputResult.TooMuchArgs, currentCommand];
        // 指令还有更多参数
        else commands = filterHide ? currentCommand.children.filter(({ hide }) => !hide) : currentCommand.children;
      }
    }
    else {
      if (!commandIndex.length) return ParseInputResult.NoSuchCommand;
      else return [ParseInputResult.TooMuchResult, commandIndex.map(index => commands[index])];
    }
  }

  throw new Error(i18nLangModel.warning.no_such_command);
}
