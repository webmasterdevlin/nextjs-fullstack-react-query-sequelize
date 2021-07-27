import boom from "@hapi/boom";
import { Model } from "sequelize";

import AntiHeroEntity from "src/models/api/antiHeroEntity";
import { AntiHeroModel } from "src/models/client/antiHeroModel";

export const antiHeroFind = async (): Promise<Model[]> => {
  try {
    return await AntiHeroEntity.findAll();
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const antiHeroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    await AntiHeroEntity.destroy({
      where: { id },
    });
  } catch (e) {
    throw boom.boomify(e);
  }
};

export const antiHeroSave = async (body: AntiHeroModel): Promise<Model> => {
  try {
    return await AntiHeroEntity.create({
      ...body,
    });
  } catch (e) {
    console.log(e);
    throw boom.boomify(e);
  }
};

export const antiHeroFindByIdAndUpdate = async (
  id: string,
  body: AntiHeroModel
): Promise<void> => {
  try {
    await AntiHeroEntity.update(body, { where: { id } });
  } catch (e) {
    boom.boomify(e);
  }
};

export const antiHeroFindById = async (id: string): Promise<Model> => {
  try {
    return await AntiHeroEntity.findByPk(id);
  } catch (e) {
    boom.boomify(e);
  }
};
