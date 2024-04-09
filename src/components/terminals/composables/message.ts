import { inject, provide, reactive } from "vue";

type ShowingText = [text: MessageText["model"], options: { classes: MessageText["classes"] }];

const Texts = Symbol("texts");

export function provideTexts(message: Message) {
  provide(Texts, message.texts);
}

export function injectTexts() {
  const texts = inject<Message["texts"]>(Texts)!;

  const showingTexts = reactive<Array<ShowingText>>([]);

  function parseText(messageText: MessageText) {
    showingTexts.push([messageText.model, {
      classes: messageText.classes,
    }]);
  }

  const textsIsArray = Array.isArray(texts);
  if (!textsIsArray) {
    parseText(texts);
  }
  else {
    let index = 0;
    const _texts = texts;
    function forEachTexts() {
      const text = _texts[index++];
      parseText(text);

      if (text.init) {
        text.init?.(index >= _texts.length ? () => { } : forEachTexts);
      }
      else {
        if (index >= _texts.length) return;
        forEachTexts();
      }
    }
    forEachTexts();
  }

  return { showingTexts };
}
