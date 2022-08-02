const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms_Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Track }) {
      this.belongsTo(Room, {
        foreignKey: 'room_id',
      });
      this.belongsTo(Track, {
        foreignKey: 'track_id',
      });
    }
  }
  Rooms_Track.init({
    room_id: DataTypes.INTEGER,
    track_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rooms_Track',
  });
  return Rooms_Track;
};
