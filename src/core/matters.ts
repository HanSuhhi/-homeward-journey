import { shallowReactive } from "vue";
import { globalMatters } from "./matter";
import { setMessage } from "./message";

function setMatter(classes: string | string[]) {
  return globalMatters.push({
    classes,
    messages: shallowReactive([]),
  });
}
function setTitleMatter() {
  return setMatter("matter-title matter-console");
}
function setConsoleMatter() {
  return setMatter("matter-console matter-bg");
}
function setConsoleErrorMatter() {
  return setMatter("matter-console matter-bg matter-error");
}
function setInputMatter(model: string) {
  setMatter("matter-input");

  setMessage({
    type: "text",
    displayTheme: true,
    texts: { model },
  });
}

export {
  setConsoleErrorMatter,
  setConsoleMatter,
  setInputMatter,
  setTitleMatter,
};
