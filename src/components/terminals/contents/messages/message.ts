import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { textRoles } from "../texts/roles";
import { messageEffect } from "./effect";
import { messageRoles } from "./roles";
import { messageTypes } from "./types";
import { createMessageByMessageCreator, setMessage } from "@/core/message";
import { i18nLangModel } from "@/i18n/model";
import type { Places } from "@/i18n/packages/place";

export async function setPlaceMessage(place: Places) {
  const { t } = useI18n();

  await setMessage({
    classes: [messageRoles.place, messageTypes.text],
    type: "text",
    texts: [{
      classes: textRoles.place,
      model: i18nLangModel.place[place].description,
    }],
  });

  await setMessage({
    classes: [messageRoles.place, messageTypes.text, messageEffect.enterPlace],
    type: "text",
    texts: [{
      classes: [textRoles.console],
      model: i18nLangModel.place.welcome,
    }, {
      classes: [textRoles.place],
      model: computed(() => `『${t(i18nLangModel.place[place].name)}』`),
    }],
  });
}

export async function setConsoleDefaultMessage(model: TextModel) {
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
export async function setPlayerDefaultMessage(model: string) {
  await setMessage({
    classes: [messageRoles.player, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: textRoles.player,
        model,
      },
    ],
  });
}

export async function setEnemyDefaultMessage(model: string) {
  await setMessage({
    classes: [messageRoles.enemy, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: textRoles.enemy,
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
        model: name,
      },
      {
        classes: textRoles.console,
        model: description,
      },
    ],
  });
}

export async function createCockpitPickerCommandMessage({ name, description, main }: Command) {
  const message: MessageCreator = {
    classes: [messageRoles.cockpit, messageTypes.picker],
    type: ref("picker"),
    main,
    texts: [
      {
        classes: [textRoles.cockpit, "text-help-title"],
        model: name,
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

export function createCockpitRunCommandMessage() {
  return createMessageByMessageCreator({
    classes: [messageRoles.cockpit, messageTypes.picker],
    type: ref("picker"),
    texts: [
      {
        classes: [textRoles.cockpit, "text-help-title"],
        model: i18nLangModel.commands.run.name,
      },
      {
        classes: [textRoles.cockpit],
        model: i18nLangModel.commands.run.description,
      },
    ],
  });
}
