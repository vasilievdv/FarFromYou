'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users_Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        onDelite: 'cascade',
      },
      room_id: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Rooms',
        },
        key: 'id',
      },
      onDelite: 'cascade',
    },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
    });
},
  async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Users_Rooms');
}
};