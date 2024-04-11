import { commonHelps } from "../defaultHelps";

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

function useHelps() {
  const helps: Help[] = commonHelps;

  const setHelp = (help: Help) => {
    helps.push(help);
  };

  return { setHelp, helps };
}

function craeteDefaultState() {
  const { onEntered, runAllEnters } = useOnEnter();
  const { helps, setHelp } = useHelps();

  return {
    isSubState: false,
    runAllEnters,
    helps,
    defineFunctions: {
      onEntered,
      setHelp,
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
