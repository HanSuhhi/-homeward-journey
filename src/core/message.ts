import { currentMatter } from "./matter";

let messageIndex = 0;
export function setMessage(message: Message): number {
  Reflect.set(message, "id", messageIndex++);
  currentMatter.value.messages.push(message);

  return currentMatter.value.messages.length;
}
