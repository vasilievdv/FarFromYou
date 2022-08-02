const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Track, Users_Rooms_Role }) {
      this.hasMany(Track, {
        foreignKey: 'user_id',
      });
      this.hasMany(Users_Rooms_Role, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
