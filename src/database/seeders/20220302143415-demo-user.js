'use strict';
import { roles } from '../../helpers/roles';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      // {
      //   firstName: 'John',
      //   lastName: 'Doe',
      //   email: 'example@example.com',
      //   userName: 'testUser1',
      //   password: 'password',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstName: 'andela',
      //   lastName: 'kigali',
      //   email: 'andela@andela.com',
      //   userName: 'testUser2',
      //   password: 'password2',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      {
        name: roles.REQUESTER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: roles.MANAGER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: roles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: roles.SUPER_ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
