import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { inputRef, inputValue } from "@/input.store";
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

async function checkCommand(command: string) {
  const commandParts = command.trim().split(/\s+/);

  let commands = stateManager.currentState.value!.commands;

  while (commandParts.length) {
    // 检验指令参数
    const commandPart = commandParts.shift()!;
    const commandIndex = compareStringSimilarity(commandPart, commands);

    if (typeof commandIndex === "number") {
      const currentCommand = commands[commandIndex];

      // 当用户输入指令解析完成时
      if (!commandParts.length) {
        // 当前指令不可执行
        if (!currentCommand.effect) {
          console.warn(i18nLangModel.warning.input_command_error);
          console.warn(i18nLangModel.warning.input_paramter_less_than_command);
          return;
        }

        // 当前指令可执行
        else { await currentCommand.effect(); }
      }

      // 当用户指令仍未解析完成
      else {
        // 指令已无更多参数
        if (!currentCommand.children?.length) {
          console.warn(i18nLangModel.warning.input_command_error);
          console.warn(i18nLangModel.warning.input_paramter_greater_than_command);
          return;
        }
        // 指令还有更多参数
        else { commands = currentCommand.children; }
      }
    }
    else {
      if (!commandIndex.length) console.warn("未查找到指令");
      else console.warn("指令过多：无法确定具体指令");
    }
  }
}

export function validateInputValue() {
  return checkCommand(inputValue.value);
}

export function completeCommand() {
  if (!inputValue.value) return setTimeout(() => inputRef.value!.focus(), 0);

  const commandParts = inputValue.value.trim().split(/\s+/);

  let commands = stateManager.currentState.value!.commands;

  for (const partIndex in commandParts) {
    const index = Number(partIndex);
    const commandPart = commandParts[index];
    const commandIndex = compareStringSimilarity(commandPart, commands);
    if (Array.isArray(commandIndex)) {
      setTimeout(() => inputRef.value!.focus(), 0);
      return console.warn("之前命令不合法");
    }

    if (index !== commandParts.length - 1) {
      commands = commands[commandIndex].children!;
      continue;
    }

    const needReplace = inputValue.value.includes(" ");
    if (needReplace) {
      const lastSpaceIndex = inputValue.value.lastIndexOf(" ");

      inputValue.value = `${inputValue.value.substring(0, lastSpaceIndex + 1)}${i18n.global.t(commands[commandIndex].name)}`;
    }
    else {
      inputValue.value = `${i18n.global.t(commands[commandIndex].name)} `;
    }

    setTimeout(() => inputRef.value!.focus(), 0);
  }
}
