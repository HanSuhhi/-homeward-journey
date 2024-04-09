import { setMessage } from "@/core/message";

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
