'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Role, Track }) {
      this.hasMany(Room, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Role, {
        foreignKey: 'role_id',
      });
      this.hasMany(Track, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Room, {
        through: 'Users_Rooms',
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};