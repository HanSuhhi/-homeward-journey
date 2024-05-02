import { cn_find_in_bedroom_commands } from "../packages/commands/find-in-bedroom.command";
import { cn_help_commands } from "../packages/commands/help.command";
import { cn_language_commands } from "../packages/commands/language.command";
import { cn_leave_bedroom } from "../packages/commands/leave-bedroom";
import { cn_memory_commands } from "../packages/commands/memory.command";
import { cn_run_commands } from "../packages/commands/run.command";
import { cn_setting_commands } from "../packages/commands/setting.command";
import { cn_wake_up_commands } from "../packages/commands/wake_up.command";
import { cn_in_bedroom } from "../packages/in-bedroom.state";
import { cn_init } from "../packages/init.state";
import { cn_intoxication } from "../packages/intoxication.state";
import { cn_place } from "../packages/place";
import { cn_setting } from "../packages/setting.state";
import { cn_warning } from "../packages/warning";

const states = {
  init: cn_init,
  setting: cn_setting,
  intoxication: cn_intoxication,
  in_bedroom: cn_in_bedroom,
};

const model = {
  questionKey: "？",
  states,
  commands: {
    help: cn_help_commands,
    setting: cn_setting_commands,
    language: cn_language_commands,
    run: cn_run_commands,
    wake_up: cn_wake_up_commands,
    memory: cn_memory_commands,
    find_in_bedroom: cn_find_in_bedroom_commands,
    leave_bedroom: cn_leave_bedroom,
  },
  place: cn_place,
  warning: cn_warning,
};

export default model;

export type I18N = typeof model;
