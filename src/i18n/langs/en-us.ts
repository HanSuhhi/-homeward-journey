import { en_common_commands } from "../packages/commonCommands";
import { en_init } from "../packages/init.state";
import { en_setting } from "../packages/setting.state";
import { en_warning } from "../packages/warning";
import type { I18N } from "./zh-cn";

export default <I18N>{
  states: {
    init: en_init,
    setting: en_setting,
  },
  common_commands: en_common_commands,
  warning: en_warning,
};
