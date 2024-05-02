import { en_find_in_bedroom_commands } from "../packages/commands/find-in-bedroom.command";
import { en_help_commands } from "../packages/commands/help.command";
import { en_language_commands } from "../packages/commands/language.command";
import { en_leave_bedroom } from "../packages/commands/leave-bedroom";
import { en_memory_commands } from "../packages/commands/memory.command";
import { en_run_commands } from "../packages/commands/run.command";
import { en_setting_commands } from "../packages/commands/setting.command";
import { en_wake_up_commands } from "../packages/commands/wake_up.command";
import { en_in_bedroom } from "../packages/in-bedroom.state";
import { en_init } from "../packages/init.state";
import { en_intoxication } from "../packages/intoxication.state";
import { en_place } from "../packages/place";
import { en_setting } from "../packages/setting.state";
import { en_warning } from "../packages/warning";
import type { I18N } from "./zh-cn";

export default <I18N>{
  questionKey: "?",
  states: {
    init: en_init,
    setting: en_setting,
    intoxication: en_intoxication,
    in_bedroom: en_in_bedroom,
  },
  commands: {
    help: en_help_commands,
    setting: en_setting_commands,
    language: en_language_commands,
    run: en_run_commands,
    wake_up: en_wake_up_commands,
    memory: en_memory_commands,
    find_in_bedroom: en_find_in_bedroom_commands,
    leave_bedroom: en_leave_bedroom,
  },
  place: en_place,
  warning: en_warning,
};
