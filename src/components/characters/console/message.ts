import { setMessage } from "@/core/message";
import { i18n } from "@/i18n/locale";

export function setConsoleMessageText(model: string) {
  setMessage({
    classes: "message-console",
    type: "text",
    texts: [
      {
        classes: "text-console",
        model,
      },
    ],
  });
}

export function setConsoleHelpMessageText({ name, description }: Help) {
  setMessage({
    classes: "message-console",
    type: "text",
    texts: [
      {
        classes: "text-console text-help-title",
        model: `${i18n.global.t(name)}`,
      },
      {
        classes: "text-console",
        model: description,
      },
    ],
  });
}
