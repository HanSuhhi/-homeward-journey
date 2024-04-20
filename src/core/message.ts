import { currentMatter } from "./matter";

let messageIndex = 0;

function useMessageClasses(message: MessageCreator) {
  const { classes } = message;
  if (typeof classes === "string") message.classes = [classes];
  if (!classes) message.classes = [];
}

async function useMessageInit(message: MessageCreator) {
  if (!message.texts) return;
  if (!Array.isArray(message.texts)) return await message.texts.init?.();
  for (const text of message.texts)
    await text.init?.();
}

export function createMessageByMessageCreator(message: MessageCreator) {
  Reflect.set(message, "id", messageIndex++);

  useMessageClasses(message);
  useMessageInit(message);

  return message as Message;
}

export async function setMessage(message: MessageCreator): Promise<number> {
  message = createMessageByMessageCreator(message);
  currentMatter.value.messages.push(message as Message);

  return currentMatter.value.messages.length;
}
