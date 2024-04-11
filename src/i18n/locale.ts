import { createI18n } from "vue-i18n";

function createI18nConfig() {
  const locale = localStorage.getItem("locale") || "zh-cn";

  const messages: Record<string, any> = import.meta.glob("./langs/*.ts", { eager: true, import: "default" });

  for (const key in messages) {
    const messageName = key.match(/\/([^\/]+)\.ts$/)![1].toLowerCase();
    messages[messageName] = messages[key];
    delete messages[key];
  }

  const i18n = createI18n({
    locale,
    legacy: false,
    messages,
    fallbackLocale: locale,

  });

  return i18n;
};

export const i18n = createI18nConfig();
