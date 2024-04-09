import { cn_common_commands } from "../packages/commonCommands";
import { cn_init } from "../packages/init.state";
import { cn_setting } from "../packages/setting.state";
import { cn_warning } from "../packages/warning";

const zhCnModel = {
  states: {
    init: cn_init,
    setting: cn_setting,
  },
  common_commands: cn_common_commands,
  warning: cn_warning,
};

export default zhCnModel;

export type I18N = typeof zhCnModel;
