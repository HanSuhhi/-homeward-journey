import { ParseInputResult, parseInputValue } from "./parse";
import { inNoCommandInput } from "@/composables/input";
import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { Blank, questionMark } from "@/i18n/vars";
import { focusInput, inputValue } from "@/input.store";

export async function runCommand(command: string) {
  const result = await parseInputValue(command.trim());

  if (Array.isArray(result)) {
    const [commandResult, commandStruct] = result;

    switch (commandResult) {
      case ParseInputResult.NoEffect:
      case ParseInputResult.TooMuchArgs:
        await inNoCommandInput();
        // setConsoleMatter();
        // setConsoleDefaultMessageText(i18nLangModel.warning.no_such_command);
        break;
      case ParseInputResult.Run:
        await commandStruct.effect?.(command);
        break;
      case ParseInputResult.TooMuchResult:
        console.warn("指令过多：无法确定具体指令");
        break;
      default: throw new Error(i18nLangModel.warning.no_such_command);
    }
  }
  else {
    inNoCommandInput();
  }
}

function getCommandTxt(txt?: string) {
  if (typeof txt === "undefined") txt = inputValue.value;

  if (txt.endsWith(questionMark)) return getCommandTxt(txt.slice(0, txt.length - questionMark.length));
  return txt;
}

interface LastInputCommandSplit {
  command?: Command | Command[];
  fullCommandTxt: string;
};

export async function modifyLastInputCommandSplit(callback: (lastInputCommandSplit: LastInputCommandSplit) => any) {
  const lastInputCommandSplit: LastInputCommandSplit = { fullCommandTxt: getCommandTxt() };
  const result = await parseInputValue(lastInputCommandSplit.fullCommandTxt);

  if (Array.isArray(result)) {
    const [commandResult, command] = result;
    switch (commandResult) {
      case ParseInputResult.TooMuchArgs:
        break;
      case ParseInputResult.NoEffect:
      case ParseInputResult.Run:
      case ParseInputResult.TooMuchResult:
        lastInputCommandSplit.command = command;
        break;
      default: throw new Error(i18nLangModel.warning.no_such_command);
    }
  }

  await callback(lastInputCommandSplit);
}

export function completeCommand() {
  // if (!inputValue.value) return;
  Promise.resolve()
    .then(() => modifyLastInputCommandSplit(({ command }) => {
      // no command
      if (!command) return;

      let currentCommand: Command;

      // to many command
      if (Array.isArray(command)) currentCommand = command.find(({ hide }) => !hide) || command[0];
      else currentCommand = command;

      const needReplace = inputValue.value.includes(Blank);
      if (needReplace) {
        const lastSpaceIndex = inputValue.value.lastIndexOf(Blank);
        inputValue.value = `${inputValue.value.substring(0, lastSpaceIndex + 1)}${i18n.global.t(currentCommand.name)} `;
      }
      else {
        inputValue.value = `${i18n.global.t(currentCommand.name)} `;
      }
    }))
    .then(focusInput);
}
