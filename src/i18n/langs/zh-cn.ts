import { cn_help_commands } from "../packages/commands/help.command";
import { cn_language_commands } from "../packages/commands/language.command";
import { cn_run_commands } from "../packages/commands/run.command";
import { cn_setting_commands } from "../packages/commands/setting.command";
import { cn_wake_up_commands } from "../packages/commands/wake_up.command";
import { cn_init } from "../packages/init.state";
import { cn_intoxication } from "../packages/intoxication";
import { cn_setting } from "../packages/setting.state";
import { cn_warning } from "../packages/warning";
import type { GAME_STATE } from "@/state/state.enum";

const states = {
  init: cn_init,
  setting: cn_setting,
  intoxication: cn_intoxication,
};

type StateModel = {
  [key in GAME_STATE]: typeof states[key]
};

const model = {
  questionKey: "？",
  states: <StateModel>states,
  commands: {
    help: cn_help_commands,
    setting: cn_setting_commands,
    language: cn_language_commands,
    run: cn_run_commands,
    wake_up: cn_wake_up_commands,
  },
  warning: cn_warning,
};

export default model;

export type I18N = typeof model;
