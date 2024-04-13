import { useCommand } from "./composables/command";

function useOnEnter() {
  const enters: Array<() => any> = [];

  function onEntered(fn: () => any) {
    enters.push(fn);
  }

  async function runAllEnters() {
    for (const fn of enters) await fn();
  }

  return { onEntered, runAllEnters };
}

function craeteDefaultState() {
  const { onEntered, runAllEnters } = useOnEnter();
  const { commands, setCommand } = useCommand();

  return {
    runAllEnters,
    commands,
    defineFunctions: {
      onEntered,
      setCommand,
    },
  };
}

export type State = ReturnType<typeof craeteDefaultState>;
type StateDefine = State["defineFunctions"];

export function defineState(fn: (state: StateDefine) => any) {
  return () => {
    const state = craeteDefaultState();
    fn(state.defineFunctions);

    return state;
  };
}

export type StateCreator = ReturnType<typeof defineState>;
