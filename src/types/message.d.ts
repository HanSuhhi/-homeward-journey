type MessageType = "text" | "hr" | "picker";
type InputModel = string | import("vue").Ref<string>;

type TextModel = InputModel | {
  model: InputModel;
  props: Record<string, any>;
};

interface MessageText {
  model: TextModel;
  init?: () => Promise<any> | any;
  classes?: string | string[];
}

interface Message {
  classes: string[];
  type: MessageType | import("vue").Ref<MessageType>;
  displayTheme?: boolean;
  texts?: Array<MessageText> | MessageText;
  main?: boolean;
}

type MessageCreator = Omit<Message, "classes"> & {
  classes?: string | string[];
};

type ShowingText = [text: MessageText["model"], options: { classes: MessageText["classes"] }];
