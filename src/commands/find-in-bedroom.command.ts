import { i18nLangModel } from "@/i18n/model";

const model = i18nLangModel.commands.find_in_bedroom;

export const findInBedroomCommand: Command = {
  name: model.name,
  description: model.description,
  async effect() {
    // TODO
  },
};
