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
    static associate({ Track, Users_Rooms_Role }) {
      this.belongsToMany(Track, {
        through: 'Rooms_Tracks',
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
