const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rooms_Track, Users_Rooms_Role }) {
      this.hasMany(Rooms_Track, {
        foreignKey: 'room_id',
      });
      this.hasMany(Users_Rooms_Role, {
        foreignKey: 'room_id',
      });
    }
  }
  Room.init({
    roomName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
