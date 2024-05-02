import { defineState } from "./creator";
import { leaveBedroomCommand } from "@/commands/leave-bedroom";
import { findInBedroomCommand } from "@/commands/find-in-bedroom.command";

export default defineState(({ setCommand }) => {
  setCommand(findInBedroomCommand);
  setCommand(leaveBedroomCommand);
});
