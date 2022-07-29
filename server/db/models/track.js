const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Room }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsToMany(Room, {
        through: 'Rooms_Tracks',
        foreignKey: 'track_id',
      });
    }
  }
  Track.init({
    trackName: DataTypes.STRING,
    artist: DataTypes.STRING,
    url: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
