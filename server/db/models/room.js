'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Track }) {
      this.hasMany(User, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Track, {
        through: 'Rooms_Tracks',
        foreignKey: 'room_id',
      });
      this.belongsToMany(User, {
        through: 'Users-Rooms',
        foreignKey: 'room_id',
      });
    }
  }
  Room.init({
    roomName: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};