const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users_Rooms_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Room, Role }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Room, {
        foreignKey: 'room_id',
      });
      this.belongsTo(Role, {
        foreignKey: 'role_id',
      });
    }
  }
  Users_Rooms_Role.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users_Rooms_Role',
  });
  return Users_Rooms_Role;
};
