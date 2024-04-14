import { ParseInputResult, parseInputValue } from "./parse";
import { questionMark } from "@/i18n/vars";
import { i18n } from "@/i18n/locale";
import { i18nLangModel } from "@/i18n/model";
import { inputRef, inputValue } from "@/input.store";
import { setConsoleMatter } from "@/core/matters";
import { setConsoleMessageText } from "@/components/characters/console/message";
import { inNoCommandInput } from "@/composables/input";

export async function runCommand(command: string) {
  const result = await parseInputValue(command.trim());

  if (Array.isArray(result)) {
    const [commandResult, command] = result;

    switch (commandResult) {
      case ParseInputResult.NoEffect:
      case ParseInputResult.TooMuchArgs:
        setConsoleMatter();
        setConsoleMessageText(i18nLangModel.warning.no_such_command);
        break;
      case ParseInputResult.Run:
        await command.effect?.();
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
  if (!inputValue.value) return;
  modifyLastInputCommandSplit(({ command }) => {
    if (!command) return console.warn("无该命令");

    if (Array.isArray(command)) {
      setTimeout(() => inputRef.value!.focus(), 0);
      return console.warn("支持的命令很多");
    }

    const needReplace = inputValue.value.includes(" ");
    if (needReplace) {
      const lastSpaceIndex = inputValue.value.lastIndexOf(" ");
      inputValue.value = `${inputValue.value.substring(0, lastSpaceIndex + 1)}${i18n.global.t(command.name)} `;
    }
    else {
      inputValue.value = `${i18n.global.t(command.name)} `;
    }
  });
  setTimeout(() => inputRef.value!.focus(), 0);
}
