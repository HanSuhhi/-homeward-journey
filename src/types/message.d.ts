interface MessageText {
  model: string | import("vue").Ref<string>;
  init?: (finish: () => void) => Promise<any> | any;
  classes?: string | string[];
}

interface Message {
  classes?: string | string[];
  type: "text" | "hr";
  displayTheme?: boolean;
  texts?: Array<MessageText> | MessageText;
}
