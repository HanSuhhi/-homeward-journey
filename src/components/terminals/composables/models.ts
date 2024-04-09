import type { Component } from "vue";

export function useModels() {
  const models = import.meta.glob<Component>("../models/**/*.vue", { eager: true, import: "default" });

  for (const key in models) {
    const componentName = key.match(/\/([^\/]+)\.vue$/)![1].toLowerCase();
    models[componentName] = models[key];
    delete models[key];
  }

  return { models };
}
