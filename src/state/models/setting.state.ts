import { defineState } from "./creator";
import { languageCommand } from "@/commands/language.command";

export default defineState(({ setCommand }) => {
  setCommand(languageCommand);
});
