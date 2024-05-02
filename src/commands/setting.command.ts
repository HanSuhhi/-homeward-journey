import { setConsoleDefaultMessage } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";
import { stateManager } from "@/state/state";
import { GAME_STATE } from "@/state/state.enum";

export const settingCommand: Command = {
  name: i18nLangModel.commands.setting.name,
  description: i18nLangModel.commands.setting.description,
  hide: true,
  effect() {
    // const { setPickerEvent } = usePickerStore();

    // setConsoleMatter();
    // inputState.value = InputState.Picker;
    // setConsolePickerMessageTexts("选项1");
    // setConsolePickerMessageTexts("选项2");
    // setConsolePickerMessageTexts("选项3");

    // setPickerEvent((index: number) => {
    //   console.log(index);
    // });

    setConsoleMatter();
    stateManager.switchState(GAME_STATE.Setting);
    setConsoleDefaultMessage(i18nLangModel.states.setting.success);
  },
};
