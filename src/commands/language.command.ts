import { useI18n } from "vue-i18n";
import { defineCommand } from "./creator";
import { setConsoleDefaultMessageText } from "@/components/terminals/contents/messages/message";
import { setConsoleMatter } from "@/core/matters";
import { i18nLangModel } from "@/i18n/model";

function toggleLanguage(lang: "zh-cn" | "en-us") {
  const { t, locale } = useI18n();

  setConsoleMatter();

  // already in the target state
  if (locale.value === lang) return setConsoleDefaultMessageText(i18nLangModel.commands.language.switch_fail);

  // toggle state
  locale.value = lang;
  setConsoleDefaultMessageText({
    model: i18nLangModel.commands.language.switch_success,
    props: {
      lang: t(i18nLangModel.commands.language.setting.zh_cn.name),
    },
  });
}

export const languageCommand = defineCommand({
  name: i18nLangModel.commands.language.name,
  description: i18nLangModel.commands.language.description,
  children: [
    {
      name: i18nLangModel.commands.language.setting.name,
      description: i18nLangModel.commands.language.setting.description,
      children: [
        {
          name: i18nLangModel.commands.language.setting.zh_cn.name,
          description: i18nLangModel.commands.language.setting.zh_cn.description,
          effect() {
            toggleLanguage("zh-cn");
          },
        },
        {
          name: i18nLangModel.commands.language.setting.en_us.name,
          description: i18nLangModel.commands.language.setting.en_us.description,
          effect() {
            toggleLanguage("en-us");
          },
        },
      ],
    },
  ],
});
