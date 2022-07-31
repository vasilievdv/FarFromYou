module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms_Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      track_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Tracks',
          },
          key: 'id',
        },
        onDelite: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms_Tracks');
  },
};
