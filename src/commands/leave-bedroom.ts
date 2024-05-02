import { i18nLangModel } from "@/i18n/model";

const model = i18nLangModel.commands.leave_bedroom;

export const leaveBedroomCommand: Command = {
  name: model.name,
  description: model.description,
  main: true,
  async effect() {
    // TODO
  },
};
