const langs = {
  zh_cn: {
    name: "简体中文",
    description: "设置语言为简体中文",
  },
  en_us: {
    name: "English",
    description: "Set language to English",
  },
};

export const cn_language_commands = {
  name: "语言",
  description: "通过此指令配置全局的语言选项",
  switch_success: "成功切换语言为 「{lang}」",
  switch_fail: "已处于对应语言环境下",
  setting: {
    name: "设置",
    description: "设置语言",
    ...langs,
  },
};
export const en_language_commands = {
  name: "Language",
  description: "Configure global language options using this command",
  switch_success: "Successfully switched language to 「{lang}」",
  switch_fail: "Already in the corresponding language environment",
  setting: {
    name: "Setting",
    description: "Set language",
    ...langs,
  },
};
