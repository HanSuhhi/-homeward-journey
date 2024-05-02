import { computed } from "vue";
import { textRoles } from "../texts/roles";
import { messageRoles } from "./roles";
import { messageTypes } from "./types";
import { i18n } from "@/i18n/locale";
import { setMessage } from "@/core/message";

export async function setAllyDefaultMessage(model: string) {
  await setMessage({
    classes: [messageRoles.ally, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: textRoles.ally,
        model,
      },
    ],
  });
}

export async function allySay(model: string) {
  await setMessage({
    classes: [messageRoles.ally, messageTypes.text],
    type: "text",
    texts: [
      {
        classes: textRoles.ally,
        model: computed(() => `「${i18n.global.t(model)}」`),
      },
    ],
  });
}
