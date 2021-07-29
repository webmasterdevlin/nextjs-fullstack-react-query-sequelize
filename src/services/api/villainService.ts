import { Model } from "sequelize";

import VillainEntity from "src/models/api/villainEntity";
import { VillainModel } from "src/models/client/villainModel";

export const villainFind = async (): Promise<Model[]> => {
  try {
    return await VillainEntity.findAll();
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndRemove = async (id: string): Promise<void> => {
  try {
    await VillainEntity.destroy({
      where: { id },
    });
  } catch (e) {
    throw e;
  }
};

export const villainSave = async (body: VillainModel): Promise<Model> => {
  try {
    return await VillainEntity.create({
      ...body,
    });
  } catch (e) {
    throw e;
  }
};

export const villainFindByIdAndUpdate = async (
  id: string,
  body: VillainModel
): Promise<void> => {
  try {
    await VillainEntity.update(body, { where: { id } });
  } catch (e) {
    throw e;
  }
};

export const villainFindById = async (id: string): Promise<Model> => {
  try {
    return await VillainEntity.findByPk(id);
  } catch (e) {
    throw e;
  }
};
