import { Model, DataTypes } from 'sequelize';
import sequelize from '@/db/db';

class Group extends Model {}

Group.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contacts: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { sequelize, modelName: 'group' });

export default Group;
