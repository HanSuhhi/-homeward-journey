import { ref } from "vue";
import { textRoles } from "../texts/roles";
import { messageRoles } from "./roles";
import { messageTypes } from "./types";
import { createMessageByMessageCreator, setMessage } from "@/core/message";
import { i18n } from "@/i18n/locale";

export async function setConsoleDefaultMessageText(model: TextModel) {
  await setMessage({
    classes: [messageRoles.console, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: textRoles.console,
        model,
      },
    ],
  });
}

export async function setConsoleCommandMessageText({ name, description }: Command) {
  await setMessage({
    classes: [messageRoles.console, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: "text-role_console text-help-title",
        model: `${i18n.global.t(name)}`,
      },
      {
        classes: textRoles.console,
        model: description,
      },
    ],
  });
}

export async function createCockpitPickerCommandMessage({ name, description }: Command) {
  const message: MessageCreator = {
    classes: [messageRoles.cockpit, messageTypes.picker],
    type: ref("picker"),
    texts: [
      {
        classes: [textRoles.cockpit, "text-help-title"],
        model: `${i18n.global.t(name)}`,
      },
      {
        classes: [textRoles.cockpit],
        model: description,
      },
    ],
  };

  return createMessageByMessageCreator(message);
}

export async function setConsolePickerMessageTexts(model: TextModel) {
  const message: MessageCreator = {
    classes: [messageRoles.console, messageTypes.picker],
    type: ref("picker"),
    texts: [
      {
        classes: [textRoles.console],
        model,
      },
    ],
  };

  await setMessage(message);
}
