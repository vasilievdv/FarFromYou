module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tracks', [{
      trackName: 'big-time-rush-city-is-ours',
      artist: 'BTR',
      url: '/audio/big-time-rush-city-is-ours.mp3',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      trackName: 'big-time-rush-big-time-rush-theme',
      artist: 'BTR',
      url: '/audio/big-time-rush-big-time-rush-theme.mp3',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      trackName: 'big-time-rush-get-up',
      artist: 'BTR',
      url: '/audio/big-time-rush-get-up.mp3',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Tracks', null, {});
  },
};
