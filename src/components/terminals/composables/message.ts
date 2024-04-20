import { inject, provide } from "vue";

const Texts = Symbol("texts");

export function provideTexts(message: Message) {
  provide(Texts, message.texts);
}

export async function injectTexts() {
  const injectTexts = inject<Message["texts"]>(Texts)!;
  const texts = Array.isArray(injectTexts) ? injectTexts : [injectTexts];

  return { texts };
}
