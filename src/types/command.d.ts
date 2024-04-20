interface Command {
  name: string;
  description: string;
  children?: Command[];
  effect?: (command?: string) => any;
  hide?: boolean;
}
