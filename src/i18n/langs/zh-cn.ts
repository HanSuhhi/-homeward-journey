import { cn_common_commands } from "../packages/commonCommands";
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
  states: <StateModel>states,
  common_commands: cn_common_commands,
  warning: cn_warning,
};

export default model;

export type I18N = typeof model;
