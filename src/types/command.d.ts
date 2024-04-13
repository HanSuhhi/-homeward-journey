interface Command {
  name: string;
  description: string;
  children?: Command[];
  effect?: () => any;
  hide?: boolean;
}
