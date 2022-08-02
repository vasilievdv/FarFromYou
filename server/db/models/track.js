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
    static associate({ User, Rooms_Track }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.hasMany(Rooms_Track, {
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
