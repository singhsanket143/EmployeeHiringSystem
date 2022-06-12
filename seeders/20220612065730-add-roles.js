'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Roles', [
       {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name:  'company',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
       }
      ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Roles', null, {});
  }
};
