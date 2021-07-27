import { DataTypes } from "sequelize";

import db from "src/utils/dbConnect";

const VillainEntity = db.define(
  "villain",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    house: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    knownAs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default VillainEntity;
