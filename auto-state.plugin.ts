import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import fg from "fast-glob";
import { slash } from "@antfu/utils";
import type { Plugin } from "vite";

const path = resolve(process.cwd(), "src", "state", "state.enum.ts");
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function stateCreator(): Plugin {
  return {
    name: "vite-plugin-state-creator",
    config() {
      const stateNames = fg.sync([
        slash(resolve(process.cwd(), "src", "state", "models", "*.state.ts")),
        slash(resolve(process.cwd(), "src", "state", "models", "**", "*.state.ts")),
      ])
        .reduce<string[]>((arr, key) => {
          const stateName = key.match(/\/([^\/]+)\.state\.ts$/)![1].toLowerCase();

          if (!arr.includes(stateName)) arr.push(stateName);
          else console.warn(`Duplicate state name: ${stateName}`);

          return arr;
        }, []);

      const file = `export enum GAME_STATE {
${stateNames.map((state, index) => {
        return `  ${capitalize(state)} = "${state}",${(index === stateNames.length - 1) ? "" : "\n"}`;
      }).join("")}
};
`;
      fs.writeFile(path, file, "utf-8");
    },
  };
}
