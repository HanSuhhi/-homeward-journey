import { setConsoleErrorMatter } from "@/core/matters";
import { setMessage } from "@/core/message";
import { i18nLangModel } from "@/i18n/model";
import { inputValue } from "@/input.store";

export async function inNoCommandInput() {
  setConsoleErrorMatter();
  setMessage({
    type: "text",
    texts: [
      {
        classes: ["text-unknown", "text-command"],
        model: inputValue.value,
      },
      {
        classes: ["text-unknown"],
        model: i18nLangModel.warning.no_such_command,
      },
    ],
  });
}
