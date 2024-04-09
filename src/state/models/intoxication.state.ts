import { defineState } from "./creator";
import { setConsoleMessageText } from "@/components/characters/console/message";
import { setConsoleMatter } from "@/core/matters";

export default defineState(({ setHelp }) => {
  setHelp({
    name: "醒来",
    description: "你处于昏睡之中，很快就要清醒过来",
    effect() {
      setConsoleMatter();
      setConsoleMessageText("醒来了");
    },
  });
});
