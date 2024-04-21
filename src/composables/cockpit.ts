import { watchThrottled, whenever } from "@vueuse/core";
import { shallowRef } from "vue";
import { storeToRefs } from "pinia";
import { modifyLastInputCommandSplit } from "@/components/terminals/composables/command";
import { createCockpitPickerCommandMessage, createCockpitRunCommandMessage } from "@/components/terminals/contents/messages/message";
import { Blank } from "@/i18n/vars";
import { focusInput, inputValue } from "@/input.store";
import { stateManager } from "@/state/state";
import { GAME_STATE } from "@/state/state.enum";
import { usePickerStore } from "@/core/picker";

export function useInputCheck() {
  const commands = shallowRef<Message[]>([]);
  const { total, activePickerIndex } = storeToRefs(usePickerStore());

  const checkPickerProps = () => {
    total.value = 0;
    activePickerIndex.value = 0;
  };

  async function getCommands() {
    Promise.resolve(commands.value = [])
      .then(checkPickerProps)
      .then(async () => {
        await modifyLastInputCommandSplit(async ({ command }) => {
          if (inputValue.value.endsWith(Blank) || !inputValue.value) {
            if (!command) return commands.value = [createCockpitRunCommandMessage()];

            const _commands: Message[] = [];
            for (const _command of (Array.isArray(command) ? command : [command])) {
              if (!_command.hide) {
                const message = await createCockpitPickerCommandMessage(_command);
                _commands.push(message);
              }
            }
            return commands.value = [..._commands, createCockpitRunCommandMessage()];
          }
          if (!command) return commands.value = [createCockpitRunCommandMessage()];

          if (Array.isArray(command)) {
            const _commands: Message[] = [];
            for (const _command of command) {
              if (!_command.hide) {
                const message = await createCockpitPickerCommandMessage(_command);
                _commands.push(message);
              }
            }

            return commands.value = [..._commands, createCockpitRunCommandMessage()];
          }
          commands.value = [await createCockpitPickerCommandMessage(command), createCockpitRunCommandMessage()];
        });
      })
      .then(focusInput);
  }

  watchThrottled(inputValue, getCommands, { throttle: 500 });
  whenever(() => (stateManager.state.value && stateManager.state.value !== GAME_STATE.Init), () => {
    getCommands();
  }, { once: true });

  return { commands };
}
