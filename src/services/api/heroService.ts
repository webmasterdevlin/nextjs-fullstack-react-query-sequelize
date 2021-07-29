import { Model } from "sequelize";

import HeroEntity from "src/models/api/heroEntity";
import { HeroModel } from "src/models/client/heroModel";

export const heroFind = async (): Promise<Model[]> => {
  try {
    return await HeroEntity.findAll();
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    await HeroEntity.destroy({
      where: { id },
    });
  } catch (e) {
    throw e;
  }
};

export const heroSave = async (body: HeroModel): Promise<Model> => {
  try {
    return await HeroEntity.create({
      ...body,
    });
  } catch (e) {
    throw e;
  }
};

export const heroFindByIdAndUpdate = async (
  id: string,
  body: HeroModel
): Promise<void> => {
  try {
    await HeroEntity.update(body, { where: { id } });
  } catch (e) {
    throw e;
  }
};

export const heroFindById = async (id: string): Promise<Model> => {
  try {
    return await HeroEntity.findByPk(id);
  } catch (e) {
    throw e;
  }
};
