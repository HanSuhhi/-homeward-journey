import { defineState } from "./creator";
import { wakeUpCommand } from "@/commands/wake_up.command";

export default defineState(({ setCommand }) => {
  setCommand(wakeUpCommand);
  // setCommand(memoryCommand);
});
